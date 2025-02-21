<template>
  <div class="absolute m-4 align-middle">
    <LogoViewComponent class="opacity-50 m-5 size-15 inline-block"/>
  </div>
  <div class="absolute top-0 right-0 m-4">
    <RouterLink to="/login"
      class="group relative m-5 flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white hover:text-cyan-400 focus:outline-none hover:ring-2 hover:ring-blue-400 transition-colors">
      Log in
    </RouterLink>
  </div>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-900">
    <div class="w-full max-w-md p-12 bg-gray-800 rounded-lg shadow-lg">
      <div class="">
        <h1 class="text-3xl text-center font-bold text-white">Sign Up</h1>
      </div>
      <form @submit.prevent="onSubmit" class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm">
          <div>
            <label for="username" class="sr-only">Username</label>
            <input
              v-model="username"
              id="username"
              type="text"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Document"
            />
          </div>
          <div class="mt-6">
            <label for="password" class="sr-only">Password</label>
            <input
              v-model="password"
              id="password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              :class="{ 'border-red-600': data.password.error }"
              placeholder="Password"
            />
          </div>
          <div class="mt-6">
            <label for="confirm-password" class="sr-only">Confirm Password</label>
            <input
              v-model="confirmPassword"
              id="confirm-password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              :class="{ 'border-red-600': data.password.error }"
              placeholder="Confirm Password"
            />
            <small class="text-red-600" v-if="data.password.error">
              {{ data.password.message }}</small
            >
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 cursor-pointer border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            Confirm
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import Auth from "../services/auth/auth";
import { globalState } from "../store/store";
import { ArrowLeftCircleIcon } from "@heroicons/vue/16/solid";
import LogoViewComponent from '../components/shared/LogoViewComponent.vue';
const router = useRouter();

const data = reactive({
  password: {
    error: false,
    message: "",
  },
});
const auth = new Auth();
const username = ref("");
const password = ref("");
const confirmPassword = ref("");

const onSubmit = async (e) => {
  if (password.value != confirmPassword.value) {
    data.password.error = true;
    data.password.message = "⚠️ Passwords does not match";
    return false;
  }
  const response = await auth.signUp(username.value, password.value);
  if (response.error) {
    globalState().showMessage('Error al guardar datos','error');
  }
  globalState().showMessage('Usuario creado con exito','create');
  router.push('/login');
};

function back(){
  router.push('/login');
}
</script>
