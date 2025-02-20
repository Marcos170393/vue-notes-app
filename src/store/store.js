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
                id: '',
                name: '',
            }
    }),
    getters: {
        getUserLogin(state){
            if(state.user.name == ''){
                return JSON.parse(localStorage.getItem('user'));
            }
            return state.user;
        },
        getToastMessageContent(state){
            return state.toastMessage;
        }
    },
    actions: {
        setUserLogin(user,remind){
            const {password,...userData} = user;
            if(remind){
                localStorage.setItem('user',JSON.stringify(userData));
            }
            this.user.id = user.id;
            this.user.name = user.username;
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
            
        },
        logOut(){
            this.user.id = '';
            this.user.name = '';
            localStorage.removeItem('user');
        }
    }
})