<template>
    <div>
        <div class="inline-block text-slate-600 duration-300" :class="{'text-white duration-300': router.name == link.name}">
            <component :is="link.icon"></component>
        </div>
        <RouterLink class="rounded-md w-2/3 m-auto pl-2 font-bold text-slate-500 hover:bg-slate-800 transition-all hover:translate-x-1" :to="link.route"
        :class="{'font-bold text-white pl-5': router.name == link.name}">
        <button class="cursor-pointer">
            {{ link.title }}
        </button>
    </RouterLink>
</div>
   
</template>
<script  setup>
    import { RouterLink } from 'vue-router';
    const props = defineProps(['route'])
    const link = props.route;
    import { useRoute } from 'vue-router';
    const router = useRoute();
    
</script>