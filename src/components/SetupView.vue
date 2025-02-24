<template>
  <ConfirmDeleteAccountDialogComponent :key="2" @hidde="toggleDialogDeleteAccount(false)"  :show="localState.showDialogDeleteAccount" v-if="localState.showDialogDeleteAccount"/>
  <ConfirmLogOutDialogComponent :key="1" @hidde="toggleDialogLogOut(false)"  :show="localState.showDialogLogOut" v-if="localState.showDialogLogOut"/>
  <HeaderComponent>Settings</HeaderComponent>
  <div class="absolute left-1/2 top-10 transform size-56 -translate-x-1/2 translate-y-1/2 opacity-10 duration-700 -z-10"
    :class="{'opacity-55 duration-200 -rotate-x-12 transform -rotate-z-6': localState.showLogo}">
      <img src="../resources/settings.png" alt="">
  </div>
    <div class="p-10">
      <div>
        <div class="flex mb-5">
          <h2 class="text-2xl mr-4">My account</h2>
          <div class="bg-slate-600 border border-slate-500 rounded-md max-w-fit px-3 py-1">
            <h3><UserCircleIcon class="inline-block size-5 mr-1" /> {{ localState.userName }}</h3>
          </div>
        </div>
        <div class="w-2/5 my-4 h-0.5 bg-gradient-to-r from-slate-600 to-slate-900 rounded-full"></div>
     
        <div>
          <button @click="toggleDialogLogOut(true)">
            <span class="hover:text-sky-500 cursor-pointer">
                <ArrowLeftEndOnRectangleIcon class="inline-block size-5 mr-1"/>Log Out
            </span>
          </button>
        </div>
        <div class="border rounded border-red-600 max-w-fit mt-3 hover:bg-red-500 hover:text-white transition-colors">
          <button @click="toggleDialogDeleteAccount(true)" class="cursor-pointer">
            <span class="border-r border-red-600 h-full px-1">
              <ExclamationTriangleIcon class="inline-block size-5 "/>
            </span>
            <small class="px-2">
              Delete my account
            </small>
          </button>
        </div>
      </div>
    </div>
</template>
<script setup>
import HeaderComponent from './shared/HeaderComponent.vue';
import ConfirmLogOutDialogComponent from './shared/ConfirmLogOutDialogComponent.vue';
import ConfirmDeleteAccountDialogComponent from './shared/ConfirmDeleteAccountDialogComponent.vue';
import { ArrowLeftEndOnRectangleIcon,ExclamationTriangleIcon, UserCircleIcon } from '@heroicons/vue/16/solid';
import { onMounted, reactive } from 'vue';
import { globalState } from '../store/store';



const localState = reactive({
  showLogo: true,
  showDialogLogOut: false,
  showDialogDeleteAccount: false,
  userName: globalState().getUserLogin.username,
});

onMounted(async ()=>{
  showlogo();
})

function toggleDialogLogOut(state){
    localState.showDialogLogOut = state;
}
function toggleDialogDeleteAccount(state){
    localState.showDialogDeleteAccount = state;
}
async function showlogo(){
    setTimeout(()=>{
        localState.showLogo = false;
    },0);
}
</script>

