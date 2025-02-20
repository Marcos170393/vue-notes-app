<template>
    <div ref="menuWrapper" class="absolute min-w-1/5 left-1/2 top-10 transform -translate-x-1/2 -translate-y-10 transition-all opacity-0 duration-700 bg-slate-600 p-2 rounded-md" 
        :class="{
            'transition-all translate-y-0 duration-700 opacity-100': props.show
        }">
        <h2 class="mb-2 text-center font-semibold">How do you want to name your note?</h2>
        <div class="flex flex-row justify-between" >
            <input @keyup.enter="savefile()" class="bg-slate-800 w-5/6 pl-2 placeholder:text-slate-500 rounded" type="text" placeholder="Your title note.." v-model="fileName">
            <button @click="savefile()"><CheckIcon class="size-6 hover:text-slate-400 transition-colors"/></button>
            <button @click="hidde()"><XCircleIcon class="size-6 text-red-400 hover:text-red-600 transition-colors"/></button>
        </div>
    </div>
</template>
<script setup>
    import { CheckIcon, XCircleIcon } from '@heroicons/vue/24/solid';
    import { onMounted, onUnmounted, ref } from 'vue';
    import { createNoteAction } from '../../utils/files-actions';
    import { router } from '../../router';
    
    const fileName = ref('');
    const menuWrapper = ref(null)
    const emit = defineEmits();
    
    
    const props = defineProps({
        show: Boolean,
        name: String,
        action: {
            type: Function,
            async default(name){
                const newFile = await createNoteAction(name);
                router.push(`/editor/${newFile.id}`);
            }
        }
    })

    onMounted(()=>{
        document.addEventListener('mousedown',handleClickOutside)
    })
    onUnmounted(()=>{
        document.removeEventListener('mousedown',handleClickOutside)
    })
    function hidde() {
        emit('hidde');
    }
    
    function savefile(){
        props.action(fileName.value);
    }

    const handleClickOutside = (event) => {
        if(menuWrapper.value && !menuWrapper.value.contains(event.target)){
            hidde();
        }
    }

</script>
