<template>
  <HeaderComponent>Settings</HeaderComponent>
  <div>
    <div class="p-5">

      <div class="flex flex-row items-center ">
         <button @click="setLocationAction()">
            <span class="hover:text-sky-500 cursor-pointer">
               <FolderIcon class="inline-block size-3 mr-1"/>Log Out
            </span>
         </button>
         <div class="flex">
            <p class="mx-2">></p><span></span> 
         </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import HeaderComponent from './shared/HeaderComponent.vue';
</script>
