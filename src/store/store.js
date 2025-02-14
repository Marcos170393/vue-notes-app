import { defineStore } from "pinia";

export const globalState = defineStore('config',{
    state: () => ({
            folderLocation: '',
            toastMessage: {
                text: '',
                type: '',
                show: false,
            }
    }),
    getters: {
        getFolderLocation(state){
            return state.folderLocation;
        },
        getToastMessageContent(state){
            return state.toastMessage;
        }
    },
    actions: {
        setLocation(path){
            this.folderLocation = path;
        },
        showMessage(message,type){
            this.toastMessage.text = message;
            this.toastMessage.type = type;
            this.toastMessage.show = true;
            setTimeout(()=>{
                this.toastMessage.text = '';
                this.toastMessage.type = '';
                this.toastMessage.show = false;
            },3000)
            
        }
    }
})