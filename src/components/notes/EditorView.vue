<template>
        <div class="h-full relative w-full">
            <div class="border-b pb-5 mb-5 border-slate-500">
                <div class="flex align-baseline">
                <h1 class="text-3xl"> {{fileName}}</h1>
                <button class="text-slate-500 hover:text-slate-200 cursor-pointer inline-block ml-4" @click="saveNote()">
                    <CheckCircleIcon class="size-6 "/>
                </button>
            </div>
            <p><ClockIcon class="inline-block size-4" /> <small class="underline text-blue-600">{{lastUpdate}}</small></p>
        </div>
        <div id="editor" class="m-10"></div>
    </div>
</template>
<script setup>
    import { onMounted, ref } from 'vue';
    import EditorJS from '@editorjs/editorjs';
    import { CheckCircleIcon, ClockIcon } from '@heroicons/vue/16/solid';
    import { findNotesAction, updateNoteAction } from '../../utils/files-actions';

    const props = defineProps({
        id: Number
    });
    const fileName = ref('');
    const lastUpdate = ref('');
    let editor;

    onMounted(async()=>{
        const note = await findNotesAction(props.id); 
        const content =  note.content != null ? note.content : false;
        fileName.value = note.title;
        lastUpdate.value = note.updated_at;
        editor = new EditorJS({
            holder:'editor',
            data: content,
            autofocus: true,
            hideToolbar: false,
            placeholder:'What are you thinking? ☕',
        });
    })


    async function saveNote(){
        
        editor.save().then(async (outputData) => {
            const jsonData = JSON.stringify(outputData);
            const response = await updateNoteAction(props.id,jsonData);
            if(response.status == 200){
                lastUpdate.value = response.updated_at;
            }
        }).catch((error) => {
         console.log('Saving failed: ', error)
        });
    }

</script>
<style>
    .ce-block__content,
    .ce-toolbar__content {
        max-width: unset;
    }
</style>