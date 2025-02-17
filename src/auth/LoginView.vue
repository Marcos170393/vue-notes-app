<template>
  <div class="min-h-screen flex flex-col bg-gray-900">
    <div class="absolute top-0 right-0 m-4">
        <RouterLink to="/signup"  
        class="group relative m-5 flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white hover:text-cyan-400 focus:outline-none hover:ring-2 hover:ring-blue-400 transition-colors">
              Sign Up
        </RouterLink>
    </div>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <div class="w-full max-w-md p-12 bg-gray-800 rounded-lg shadow-lg">
        <h1 class="text-3xl font-bold text-center text-white">Login</h1>
        <form @submit.prevent="login" class="mt-8 space-y-6">
          <div class="rounded-md shadow-sm">
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <input v-model="email" id="email-address" type="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address">
            </div>
            <div class="mt-6">
              <label for="password" class="sr-only">Password</label>
              <input v-model="password" id="password" type="password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded">
              <label for="remember-me" class="ml-2 block text-sm text-gray-400"> Remember me </label>
            </div>

            <div class="text-sm">
              <a href="#" class="font-medium text-indigo-400 hover:text-indigo-300"> Forgot your password? </a>
            </div>
          </div>

          <div>
            <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 my-2">
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
              </span>
              Login
            </button>
            
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

const router = useRouter()
onMounted(() => {
  console.log('Component mounted')
})
const email = ref('');
const password = ref('');

/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Makes a POST request to the /api/login endpoint
   * with the email and password values from the form.
   * If the response is successful, stores the token
   * in local storage and redirects the user to the
   * home page. If the response is not successful,
   * displays an alert with the error message.

/******  df0aa00e-1724-4a95-85da-92692605fd47  *******/async function login() {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  })

  const data = await response.json()

  if (data.success) {
    localStorage.setItem('token', data.token)
    router.push('/')
  } else {
    alert(data.message)
  }
}
</script>

