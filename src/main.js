import { createApp } from '../node_modules/vue/dist/vue.esm-bundler.js';
import App from './App.vue'
import {router} from './router'
import { createPinia } from 'pinia';
import './index.css'

const pinia = createPinia();
createApp(App)
.use(router)
.use(pinia)
.mount('#app')

