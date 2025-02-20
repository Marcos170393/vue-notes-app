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
            }
    }),
    getters: {
        getUserLogin(state){
            if(state.user.name == ''){
                return localStorage.getItem('user');
            }
            return state.user.name;
        },
        getToastMessageContent(state){
            return state.toastMessage;
        }
    },
    actions: {
        setUserLogin(user,remind){
            if(remind){
                localStorage.setItem('user',user);
            }
            this.user.name = user;
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