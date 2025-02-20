<template> 
    <div ref="menuWrapper" class="absolute min-w-1/5 left-1/2 top-10 transform -translate-x-1/2 -translate-y-10 transition-all opacity-0 duration-700 bg-slate-600 p-2 rounded-md" 
        :class="{
            'transition-all translate-y-0 duration-700 opacity-100': props.show
        }">
        <h2 class="mb-2 font-semibold text-center">Are you sure to delete <b>{{props.name}}</b>?</h2>
        <div  class="flex flex-row justify-center">
            <button @click="deleteNote()"><CheckIcon class="size-6 mr-4 hover:text-slate-400 transition-colors"/></button>
            <button @click="hidde()"><XCircleIcon class="size-6 text-red-400 hover:text-red-600 transition-colors"/></button>
        </div>
    </div>
</template>
<script setup>
    import { CheckIcon, XCircleIcon } from '@heroicons/vue/24/solid';
    import { onMounted, onUnmounted, ref } from 'vue';
    
    const emit = defineEmits();
    const menuWrapper = ref(null);
    const props = defineProps({
        show: Boolean,
        name: String,
    })

    onMounted(() => {
      document.addEventListener('pointerdown', handleClickOutside);
    });

    onUnmounted(() => {
      document.removeEventListener('pointerdown', handleClickOutside);
    });

    const handleClickOutside = (event) => {
      if (menuWrapper.value && !menuWrapper.value.contains(event.target)) {
        hidde();
      }
    };
   
    function hidde() {
        emit('hidde');
    }

    function deleteNote() {
        emit('delete')
    }
    

</script>
