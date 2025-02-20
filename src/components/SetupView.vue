<template>
  <HeaderComponent>Settings</HeaderComponent>
  <div>
    <div class="p-5">

      <div>
        <h2 class="text-2xl mb-5">My account</h2>
        <div>
          <button @click="logout()">
            <span class="hover:text-sky-500 cursor-pointer">
                <ArrowLeftEndOnRectangleIcon class="inline-block size-5 mr-1"/>Log Out
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import HeaderComponent from './shared/HeaderComponent.vue';
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/vue/16/solid';
import Auth from '../services/auth/auth';
const auth= new Auth();
function logout(){
  auth.logout();
}
</script>

