<template>
        <div class="h-full relative w-full">
            <div class="border-b pb-5 mb-5 border-slate-500">
                <div class="flex align-baseline">
                <h1 class="text-3xl"> {{fileName}}</h1>
            </div>
            <p><ClockIcon class="inline-block size-4" /> <small class="underline text-blue-600">{{lastUpdate}}</small></p>
        </div>
        <div id="editor" class="m-10"></div>
    </div>
</template>
<script setup>
    import { onMounted, ref } from 'vue';
    import EditorJS from '@editorjs/editorjs';
    import Title from "title-editorjs";
    import EditorjsList from '@editorjs/list';
    import CodeTool from '@editorjs/code';
    import InlineCode  from '@editorjs/inline-code';
    import { ClockIcon } from '@heroicons/vue/16/solid';
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
            hideToolbar: true,
            placeholder:'What are you thinking? ☕',
            tools: {
                title:{
                    class: Title,
                    shortcut: 'CMD+SHIFT+T',
                    inlineToolbar: true
                },
                list:{
                    class: EditorjsList,
                    inlineToolbar: true,
                    shortcut: 'CMD+SHIFT+L',
                    config: {
                        defaultStyle: 'unordered'
                    }
                },
                code: {
                    class: CodeTool,
                    config: {
                        defaultLanguage: 'plaintext'

                    }
                },
                InlineCode: {
                    class: InlineCode,
                    shortcut: 'CMD+SHIFT+C'
                }
                
            },
            onChange: async () => {
                setTimeout(async()=>{
                    await saveNote();
                },500);
            }
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