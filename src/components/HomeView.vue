<template>
    <div>
        <div class="mb-4">
            <h1 class="text-4xl font-semibold">Bienvenido a MemoWave 😎</h1>
        </div>
        <div class="border border-slate-600 rounded-md p-8 m-4">
            <h2 class="text-xl mb-3">☁️ Almacena tus notas donde puedas accederlas siempre</h2>
            <p>Tus notas seran guardadas en tu equipo, pero si lo deseas, podras sincronizarlas en tu cuenta de 
                <button class="font-semibold" @click="sendDropBoxBrowser()">DropBox</button>
                <CubeIcon class="size-4 mx-1 inline-block"/>
            </p>
        </div>
    </div>
</template>
<script setup>
    import { sendDropBoxBrowser } from '../utils/open-link';
    import { CubeIcon } from '@heroicons/vue/16/solid';
</script>