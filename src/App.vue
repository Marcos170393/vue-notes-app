<template>
  <div class="grid grid-cols-12 h-svh text-gray-300 font-sans font-thin relative">
    <ToastMessageCompontent/>
    <template v-if="!$route.path.includes('login') && !$route.path.includes('signup') && !$route.path.includes('404')">
      <NavComponent/>
      <main class="col-span-10 h-full p-4">
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </template>
    <main v-else class="col-span-12 h-full">
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