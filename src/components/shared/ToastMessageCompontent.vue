<template>
        <div id="toast" class="absolute z-10 flex justify-center rounded-md items-center bg-slate-800 py-2 slate-600 opacity-0 min-w-60 max-w-100 h-11 right-4 -translate-y-4 duration-150"
            :class="{
                'transition-all translate-y-4 duration-150 opacity-100 shadow-lg border-slate-500 shadow-slate-950 ': data.showMessage            }"
        >
        <div>

            <p class="text-slate-100 font-semibold mx-4">
                {{ data.messageToast }}
            </p>
        </div>
        <div >
            <p v-if="data.type == 'success'" class="text-blue-700 text-2xl mr-4"> 😎 </p>
            <p v-if="data.type == 'danger'" class=" text-2xl mr-4"> 😔 </p>
        </div>
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