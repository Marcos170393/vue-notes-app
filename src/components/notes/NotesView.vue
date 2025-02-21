<template>
      <HeaderComponent>My notes <PaperClipIcon class="size-6 inline-block"/></HeaderComponent>
      <div class="absolute left-1/2 top-10 transform -translate-x-1/2 translate-y-1/2 opacity-10 duration-700 "
      :class="{'opacity-55 duration-200 -rotate-x-12 transform -rotate-z-6': localState.showLogo}">
        <img src="../../resources/paper.png" alt="">
      </div>
    <div >
        
        <InputDialogComponent :show=localState.showInput  @hidde="handleHide"/>
        <InputDialogRenameComponent :show=localState.showRename.show :id="localState.showRename.id"  @hidde="handleHideRename" @renamed="updateList()"/>
        <ConfirmDialogComponent :name="localState.delete.name" :show="localState.delete.showDialog" @hidde="toggleHiddeConfirm(false)" @delete="deleteNote(localState.delete.id)"/>
        <div class="flex flex-row justify-end items-baselinem mt-5">
        </div>
        <div class="flex flex-row justify-end my-3">
            <input type="text" class="">
            <p> <span class="border-b border-slate-700 rounded-md px-2">Total: {{ notes.length }}</span></p>
            <span class="mx-2"></span>
            <button @click="createNote()" title="Create new note">
                <PlusCircleIcon class="size-5 mx-1 cursor-pointer rounded animate-pulse hover:animate-none text-slate-50 hover:text-slate-400 transition-all"/>
            </button>
        </div>
        <div  class="my-4 px-2 py-10 w-full max-h-100 min-h-90 overflow-scroll overflow-x-hidden">
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
                    <tr v-for="(note,index) in notes" :key="note.title" class="hover:bg-slate-900 ">
                        <td>
                            <img v-if="note.hold == 1"  @click="updateHoldNote(note.id, !note.hold)" src="../../resources/pin-selected.svg" class="size-6 cursor-pointer" alt="" title="Unhold">
                            <img v-else @click="updateHoldNote(note.id, !note.hold)"  src="../../resources/pin-unselected.svg" class="size-5 cursor-pointer opacity-20 hover:opacity-80 transition-opacity" alt="" title="Hold">

                        </td>
                        <td class="w-8/12 cursor-pointer" @click="openNote(note.id)" >
                            <p class="text-slate-500 font-semibold hover:text-slate-200">{{ note.title }}</p>
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
    import { globalState } from '../../store/store';
    import { loadNotesAction, updateNoteHoldState, deleteNoteAction } from '../../utils/files-actions';
    import { onBeforeMount, onMounted, reactive, ref } from 'vue';
    import { PlusCircleIcon,PaperClipIcon } from '@heroicons/vue/16/solid';
    import { router } from '../../router';
    import ConfirmDialogComponent from '../shared/ConfirmDeleteDialogComponent.vue';
    import DropDownComponent from '../shared/DropDownComponent.vue';
    import InputDialogComponent from '../shared/InputDialogComponent.vue';
    import InputDialogRenameComponent from '../shared/InputDialogRenameComponent.vue';
    import HeaderComponent from '../shared/HeaderComponent.vue';
    const emit = defineEmits();

     const localState = reactive({
        showInput: false,
        showLogo: true,
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
        showlogo();
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

    async function showlogo(){
        setTimeout(()=>{
            localState.showLogo = false;
        },0);
    }
    
</script>

<style>
#notesContainer {
    background-image: url('../../../public/paper.png'); /* replace with your image path */
    opacity: 0.5;
    background-repeat: no-repeat;
    background-position: center;
    background-blend-mode: multiply;
}


</style>