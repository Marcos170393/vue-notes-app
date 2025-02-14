import { createMemoryHistory, createRouter } from "vue-router";

import AboutView from "./components/AboutView.vue";
import NotesView from "./components/notes/NotesView.vue";
import EditorView from "./components/notes/EditorView.vue";
import SetupView from "./components/SetupView.vue";

const routes = [
    { 
        path: '/', 
        name:'notes',
        component: NotesView
    },
    { 
        path: '/editor/:id', 
        name:'editor',
        component: EditorView,
        props: true,
    },
    {
        path:'/setup',
        name:'setup',
        component: SetupView
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