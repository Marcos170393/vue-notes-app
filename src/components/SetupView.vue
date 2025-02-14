<template>
  <div>
   <h1 class="text-4xl ">Ajustes</h1>
   <hr class="w-2/3 my-4">
    <div class="p-5">

      <div class="flex flex-row items-center ">
         <button @click="setLocationAction()">
            <span class="hover:text-sky-500 cursor-pointer">
               <FolderIcon class="inline-block size-3 mr-1"/>Carpeta de destino 
            </span>
         </button>
         <div class="flex">
            <p class="mx-2">></p><span>{{ store.getFolderLocation }}</span> 
         </div>
      </div>
    </div>
  </div>
</template>
<script setup>
   import { FolderIcon, ArrowUpOnSquareIcon } from '@heroicons/vue/16/solid';
   import { setLocationAction } from '../utils/files-actions';
   import { globalState } from '../store/store';
   const store = globalState();

</script>
