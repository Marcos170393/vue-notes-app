<template >
    <div class="relative" ref="menuWrapper">
        <button @click="toggleHiddeSelf(true)" title="Opciones">
            <EllipsisVerticalIcon class="size-5 cursor-pointer" />
        </button>
        <div v-if="hidde" id="dialog" class="absolute z-10 w-auto bg-sky-950 -translate-x-10 p-3 transition-all rounded">
            <ul >
                <li class="flex items-baseline cursor-pointer text-white hover:text-blue-500" title="Editar nombre">
                    <button @click="renameNote(props.id)"> 
                        <PencilIcon class="size-3 inline-block mr-2" />
                    </button>
                </li>
                <li  class="flex items-baseline cursor-pointer  hover:text-red-500" title="Eliminar">
                    <button @click="toggleHiddeConfirm(true)"> 
                        <TrashIcon class="size-3 inline-block mr-2"/>
                    </button>
                </li>
            </ul>
        </div>
    </div>
    
</template>
<script setup>
    import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from '@heroicons/vue/16/solid';
    import {onMounted, onUnmounted, ref } from 'vue';
    const hidde = ref(false);
    const menuWrapper = ref(null);
    const emit = defineEmits();

    const props = defineProps({
        id: Number,
        name: String,
    })

    onMounted(() => {
      document.addEventListener('mousedown', handleClickOutside);
    });

    onUnmounted(() => {
      document.removeEventListener('mousedown', handleClickOutside);
    });
    
    function toggleHiddeSelf(value){
        hidde.value = value;
    }

    function toggleHiddeConfirm(){
        emit('showConfirmDialog', {
            show: true, 
            name:props.name,
            id: props.id
        })
    }

    const handleClickOutside = (event) => {
      if (menuWrapper.value && !menuWrapper.value.contains(event.target)) {
        toggleHiddeSelf(false);
      }
    };

    function renameNote(id){
        emit('rename',{id:id})
    }

</script>