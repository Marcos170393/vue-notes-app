<template>
    <div class="col-span-2 h-full w-5/5 flex flex-col shadow-md shadow-slate-800 hidden md:block">
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
        <div id="navSocialMediaLinks" class=" bottom-0 w-auto">
            <a href="https://github.com/Marcos170393/vue-notes-app" target="_blank" class="inline-block mx-1 hover:-translate-y-0.5 transition-transform" >
                <img src="../../resources/github-142-svgrepo-com.svg" alt="">
            </a>
            <a href="https://www.linkedin.com/in/marcos-correa-larrosa/" target="_blank" class="inline-block mx-1 hover:-translate-y-0.5 transition-transform" @click="sendLinkdeInBrowser()">
                <img src="../../resources/linkedin-round-svgrepo-com.svg" alt="">
            </a>
        </div>
      </div>
    <button v-if="!localstate.showNav" @click="toggleMenu()" @mouseover="animateMenu()" class="absolute z-10 top-0 right-0 m-4 block md:hidden animate-pulse" >
        <img src="../../resources/logo.png" class="size-7 inline-block" alt="">
    </button>
    <div class="absolute -translate-y-100 right-0 bg-slate-700 shad w-50 z-20 max-h-200 text-center rounded-md duration-300" 
    :class="{'translate-y-5 duration-300': localstate.showNav}" >
        <button class="absolute top-1 right-1 cursor-pointer" @click="toggleMenu()" >
            <XCircleIcon class="size-4"/>
        </button>
        <nav class="flex flex-col text-left p-4">
            <template v-for="link in links">
                <NavButtonComponent :route=link />
            </template>
        </nav>
    </div>
</template>
<script setup>
    import NavButtonComponent from './NavButtonComponent.vue';
    import { links } from '../../config/nav-links';
    import { reactive } from 'vue';
    import { XCircleIcon } from '@heroicons/vue/16/solid';

    const localstate = reactive({
        showNav: false, 
        animateMenu: false,   
    })
    function toggleMenu(){
        localstate.showNav = !localstate.showNav;
    }

    function animateMenu(){
        localstate.animateMenu = !localstate.animateMenu;
    }
</script>