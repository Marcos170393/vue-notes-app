<template>
    <div class="col-span-2 h-full w-full flex flex-col shadow-md shadow-slate-800 relative">
        <div class="flex flex-row mb-6 items-end border-b rounded-md border-slate-800 shadow-lg p-4 shadow-slate-600 mx-auto">
            <h5 class="font-sans text-xl antialiased font-semibold text-blue-gray-900">
                <img src="../../resources/logo.png" class="size-7 inline-block " alt="">
                MemoWave
            </h5>
        </div>
        <nav class="flex flex-col ">
            <template v-for="link in links">
                <NavButtonComponent :route=link />
            </template>
        </nav>
        <div id="navSocialMediaLinks" class="absolute bottom-0 right-1/2 w-auto">
            <a href="https://github.com/Marcos170393/vue-notes-app" target="_blank" class="inline-block mx-1 hover:-translate-y-0.5 transition-transform" >
                <img src="../../resources/github-142-svgrepo-com.svg" alt="">
            </a>
            <a href="https://www.linkedin.com/in/marcos-correa-larrosa/" target="_blank" class="inline-block mx-1 hover:-translate-y-0.5 transition-transform" @click="sendLinkdeInBrowser()">
                <img src="../../resources/linkedin-round-svgrepo-com.svg" alt="">
            </a>
        </div>
      </div>
</template>
<script setup>
    import NavButtonComponent from './NavButtonComponent.vue';
    import { links } from '../../config/nav-links';
</script>