import { PaperClipIcon, Cog8ToothIcon } from "@heroicons/vue/16/solid";
import { h } from "vue";

export const links = [
    {
        title: 'Notes',
        name: 'notes',
        icon: () => h(PaperClipIcon, { class: "size-4" }),
        route: '/'
    },
    {
        title: 'Settings',
        name: 'setup',
        icon: () => h(Cog8ToothIcon, { class: "size-4" }),
        route: '/setup'
    }
]