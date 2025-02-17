import { defineStore } from "pinia";

export const globalState = defineStore('config',{
    state: () => ({
            folderLocation: '',
            toastMessage: {
                text: '',
                type: '',
                show: false,
            },
            user:{
                name: '',
                password: ''
            }
    }),
    getters: {
        getUserLogin(state){
            return state.user;
        },
        getToastMessageContent(state){
            return state.toastMessage;
        }
    },
    actions: {
        setUserLogin(user){
            this.user.name = user.name;
            this.user.password = user.password; 
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