<template> 
  <Transition appear mode="fade">
    <div ref="menuWrapperDelete" class="absolute min-w-1/5 left-1/2 top-10 transform -translate-x-1/2 translate-y-10 bg-slate-600 p-5 rounded-md text-center">
        <h2 class="mb-4 font-semibold text-center">Are you sure to delete your account and all of your data? 
        </h2>
        <div class="flex flex-col justify-center my-4">
          <label for="confirm">Please type <span class="text-white">"DELETE MY ACCOUNT"</span> and press ENTER to confirm</label>
          <input @keyup.enter="deleteAccount()" name="confirm" type="text" class="border-b w-1/2 m-auto border-slate-500 focus:outline-none" v-model="confirm">
        </div>
        <small class="text-red-400">
          <ExclamationTriangleIcon class="size-4 inline-block"/>
          This is an irreversible action.
          <ExclamationTriangleIcon class="size-4 inline-block"/>
        </small>
    </div>
  </Transition>
</template>
<script setup>
    import { onMounted, onUnmounted, ref, Transition } from 'vue';
    import { ExclamationTriangleIcon } from '@heroicons/vue/16/solid';
    import Auth from '../../services/auth/auth';
    import { globalState } from '../../store/store';
    const auth= new Auth();
    const emit = defineEmits();
    const menuWrapperDelete = ref(null);
    const props = defineProps({
        show: Boolean,
        name: String,
    })
    const confirm = ref('');

    onMounted(() => {
      document.addEventListener('pointerdown', handleClickOutside);
    });

    onUnmounted(() => {
      document.removeEventListener('pointerdown', handleClickOutside);
    });

    const handleClickOutside = (event) => {
      if (menuWrapperDelete.value && !menuWrapperDelete.value.contains(event.target)) {
        hidde();
      }
    };
   
    function hidde() {
        emit('hidde');
    }
    function deleteAccount(){
      if(!confirm.value.includes('DELETE MY ACCOUNT')){
        globalState().showMessage('Please enter "DELETE MY ACCOUNT" to confirm','error');
        return false;
      };
      auth.deleteAccount();
    }

</script>
