import { createMemoryHistory, createRouter } from "vue-router";

import AboutView from "./components/AboutView.vue";
import NotesView from "./components/notes/NotesView.vue";
import EditorView from "./components/notes/EditorView.vue";
import SetupView from "./components/SetupView.vue";
import { globalState } from "./store/store";
import LoginView from "./auth/LoginView.vue";
import SignUpView from "./auth/SignUpView.vue";

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
        meta: {requiresAuth: false},
    },
    {
            path: '/signup',
            name: 'Signup',
            component: SignUpView,
            meta: {requiresAuth: false},
    },
    { 
        path: '/', 
        name:'notes',
        component: NotesView,
        meta: {requiresAuth: true},
    },
    { 
        path: '/editor/:id', 
        name:'editor',
        component: EditorView,
        props: true,
        meta: {requiresAuth: true},
    },
    {
        path:'/setup',
        name:'setup',
        component: SetupView,
        meta: {requiresAuth: true},
    },
    {
        path: '/about',
        name:'about',
        component: AboutView
    }

]

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
}) 

router.beforeEach(async (to, from) => {
    if (to.meta.requiresAuth) {
        // Esta ruta requiere autenticación, verifica si el usuario está autenticado
        if (!localStorage.getItem('username')) {
          // Usuario no autenticado, redirige a login
           return { name: 'Login' }
        } 
    }
})