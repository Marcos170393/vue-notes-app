<template>
    <div >
        <InputDialogComponent :show=localState.showInput  @hidde="handleHide"/>
        <InputDialogRenameComponent :show=localState.showRename.show :id="localState.showRename.id"  @hidde="handleHideRename" @renamed="updateList()"/>
        <ConfirmDialogComponent :name="localState.delete.name" :show="localState.delete.showDialog" @hidde="toggleHiddeConfirm(false)" @delete="deleteNote(localState.delete.id)"/>
        <div class="flex flex-row justify-between items-baseline mb-24">
            <h1 class="float-left text-4xl">Notas almacenadas en tu equipo</h1>
            <button @click="createNote()" title="Crear nueva nota">
                <PlusCircleIcon class="size-5 mx-1 inline-block rounded animate-pulse hover:animate-none text-slate-50 hover:text-slate-400 transition-all"/>
            </button>
        </div>
        <div v-if="notes.length == 0">
            <p class="text-slate-400 text-lg">Wooow cuanto vacío...🍃</p>
        </div>
        <div v-else  class="my-4 px-2 py-10 w-full max-h-90 overflow-scroll overflow-x-hidden bg-slate-900 rounded-2xl shadow-inner shadow-slate-950">
            <table class="w-full table table-auto tabl" >
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody class=" ">
                    <tr v-for="(note,index) in notes" :key="note.title" class="hover:bg-slate-800">
                        <td>
                            <img v-if="note.hold == 1"  @click="updateHoldNote(note.id, !note.hold)" src="../../resources/pin-selected.svg" class="size-6 cursor-pointer" alt="" title="No fijar">
                            <img v-else @click="updateHoldNote(note.id, !note.hold)"  src="../../resources/pin-unselected.svg" class="size-5 cursor-pointer opacity-0 hover:opacity-80 transition-opacity" alt="" title="Fijar">

                        </td>
                        <td class="w-8/12">
                            <button @click="openNote(note.id)" class="text-slate-500 font-semibold hover:text-slate-200 cursor-pointer">{{ note.title }}</button>
                        </td>
                        <td>
                            <p class="text-slate-600 mr-2">{{note.updated_at}}</p>
                        </td>
                        <td>
                            <DropDownComponent 
                                :id=note.id 
                                :name="note.title" 
                                @deleted="getAllNotes()" 
                                @rename="(args)=>showInputRenameNotes(args.id)" 
                                @showConfirmDialog="(args)=>toggleHiddeConfirm(args)"/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>
<script setup>
    import { PlusCircleIcon } from '@heroicons/vue/16/solid';
    import InputDialogComponent from '../shared/InputDialogComponent.vue';
    import DropDownComponent from '../shared/DropDownComponent.vue';
    import ConfirmDialogComponent from '../shared/ConfirmDialogComponent.vue';
    import { loadNotesAction, updateNoteHoldState, deleteNoteAction } from '../../utils/files-actions';
    import { router } from '../../router';
    import { onBeforeMount, onMounted, reactive, ref } from 'vue';
    import { globalState } from '../../store/store';
    import InputDialogRenameComponent from '../shared/InputDialogRenameComponent.vue';
    const emit = defineEmits();

     const localState = reactive({
        showInput: false,
        showRename: {
            show: false,
            id: null
        },
        delete: {
            showDialog: false,
            name: null,
            id: null,
        }
    });

    const props = defineProps({
        id: Number,
        name: String,
    })

    const notes = ref([]);

    let store = null;
    
    function openNote(id){
        router.push(`/editor/${id}`);
    }
    
    onBeforeMount(()=>{
        store = globalState();
        
    })
    
    onMounted(async ()=>{
        getAllNotes();
    })

    async function getAllNotes(){
        const notesData = await loadNotesAction();
        notes.value = notesData;
    };

    function handleHide() {
        localState.showInput = false;
    }
    function handleHideRename() {
        localState.showRename.show = false;
    }
    async function createNote(){
        localState.showInput = !localState.showInput;
    };

    async function updateHoldNote(id,state){
         updateNoteHoldState(id, state).then((res)=>{
            if(res.status == 200){
                setTimeout(async()=>{
                    await getAllNotes();
                },500);
            }
         });
    }

    function showInputRenameNotes(id){
        localState.showRename.show = true;
        localState.showRename.id = id;
    }

    function toggleHiddeConfirm(args){
        localState.delete.showDialog = args.show;
        localState.delete.name = args.name;
        localState.delete.id = args.id;
    }

    async function deleteNote(id){
        const response = await deleteNoteAction(id);
        if(response.status == 200){
            setTimeout(async ()=>{
                successDelete();
                await getAllNotes()
            },500)
        }
        toggleHiddeConfirm(true);
    }

    function updateList(){
        getAllNotes();
    }

    function successDelete(){
        emit('deleted');
    }
    
</script>