<template>
<Transition appear mode="fade">
  <div v-if="props.show" ref="menuWrapper" class="absolute  min-w-1/5 left-1/2 top-10 transform -translate-x-1/2 translate-y-10 bg-slate-600 p-2 rounded-md">
    <h2 class="mb-2 font-semibold text-center">Are you sure to Logout?</h2>
    <div  class="flex flex-row justify-center">
      <button @click="logoutAction()"><CheckIcon class="size-6 mr-4 hover:text-slate-400 transition-colors"/></button>
      <button @click="hidde()"><XCircleIcon class="size-6 text-red-400 hover:text-red-600 transition-colors"/></button>
    </div>
  </div>
</Transition> 
</template>
<script setup>
    import { CheckIcon, XCircleIcon } from '@heroicons/vue/24/solid';
    import { onMounted, onUnmounted, ref, Transition } from 'vue';
    import Auth from '../../services/auth/auth';
    const auth = new Auth();
    const emit = defineEmits();
    const menuWrapper = ref(null);
    const props = defineProps({
        show: Boolean,
        name: String,
    })

    onMounted(() => {
      document.addEventListener('pointerdown', handleClickOutside);
    });

    onUnmounted(() => {
      document.removeEventListener('pointerdown', handleClickOutside);
    });

    const handleClickOutside = (event) => {
      if (menuWrapper.value && !menuWrapper.value.contains(event.target)) {
        hidde();
      }
    };
   
    function hidde() {
        emit('hidde');
    }
    function logoutAction(){
      auth.logout();
    }

</script>
