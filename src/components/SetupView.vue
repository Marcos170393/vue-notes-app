<template>
  <HeaderComponent>Settings</HeaderComponent>
  <div class="absolute left-1/2 top-10 transform size-56 -translate-x-1/2 translate-y-1/2 opacity-10 duration-700 "
    :class="{'opacity-55 duration-200 -rotate-x-12 transform -rotate-z-6': localState.showLogo}">
      <img src="../resources/settings.png" alt="">
  </div>
    <div class="p-10">
      <ConfirmLogOutDialogComponent @hidde="toggleDialog(false)"  :show="localState.showDialog"/>
      <div>
        <h2 class="text-2xl mb-5">My account</h2>
        <div class="w-2/5 my-4 h-0.5 bg-gradient-to-r from-slate-600 to-slate-900 rounded-full"></div>
        <div>
          <button @click="toggleDialog(true)">
            <span class="hover:text-sky-500 cursor-pointer">
                <ArrowLeftEndOnRectangleIcon class="inline-block size-5 mr-1"/>Log Out
            </span>
          </button>
        </div>
      </div>
    </div>
</template>
<script setup>
import HeaderComponent from './shared/HeaderComponent.vue';
import ConfirmLogOutDialogComponent from './shared/ConfirmLogOutDialogComponent.vue';
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/vue/16/solid';

import { onMounted, reactive } from 'vue';



const localState = reactive({
  showLogo: true,
  showDialog: false
});

onMounted(async ()=>{
        showlogo();
  })

function toggleDialog(state){
    localState.showDialog = state;
}
async function showlogo(){
        setTimeout(()=>{
            localState.showLogo = false;
        },0);
    }
</script>

