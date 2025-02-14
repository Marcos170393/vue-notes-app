<template>
  <div class="grid grid-cols-12 p-5 h-svh text-gray-300 font-sans font-thin relative">
    <ToastMessageCompontent/>
    <NavComponent/>
    
    <main class="col-span-9 h-full p-4">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
  import { RouterView } from "vue-router";
  import NavComponent from "./components/shared/NavComponent.vue"
  import ToastMessageCompontent from "./components/shared/ToastMessageCompontent.vue";

</script>