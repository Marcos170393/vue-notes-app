<template>
    <div id="toast" class="absolute z-10 flex flex-row p-3 items-center border-black bg-slate-600 opacity-0 max-w-80 h-11 right-4 rounded-lg -translate-y-4 duration-500"
        :class="{
            'transition-all translate-y-4 duration-500 opacity-90 shadow-slate-600 shadow-lg border border-slate-500': data.showMessage
        }"
    >
    <div>
        <p v-if="data.type == 'create'" class="text-green-700 inline-block text-lg mr-4"> 😊 </p>
        <p v-if="data.type == 'update'" class="text-green-700 inline-block text-lg mr-4"> 😏 </p>
        <p v-if="data.type == 'delete'" class="text-green-700 inline-block text-lg mr-4"> 😈 </p>
        <p v-if="data.type == 'error'" class="text-red-700 inline-block text-lg mr-4"> 😔 </p>
    </div>
    <p class="text-slate-200 font-semibold">
        {{ data.messageToast }}
    </p>
    </div>
</template>
<script setup>
    import { reactive } from 'vue';
    import { globalState } from '../../store/store';

    const store = globalState();

    const data = reactive({
        showMessage: false,
        messageToast: '',
        type: ''
    })

   

    store.$subscribe((mutation, state) => {
        data.messageToast = state.toastMessage.text;
        data.showMessage = state.toastMessage.show;
        data.type = state.toastMessage.type;
    })

</script>