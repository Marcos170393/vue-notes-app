import { neon } from '@neondatabase/serverless';
import { globalState } from '../../store/store';
import { router } from '../../router';
export default class Auth {

  constructor() {
    this.sql = neon(import.meta.env.VITE_DATABASE_URL);
  }


  async login(username,pass) {
    try{
      const result = await this.sql(`select * from users where username = $1 and password = $2;`, [username,pass]);
      if(result[0] == undefined){
        globalState().showMessage('Username or Password incorrect','error');
        return false;
      }
      globalState().showMessage(`Hi ${result[0].username} !!`,'create');
      localStorage.setItem('username',result[0].username);
      router.push('/');
    }catch(err){
      console.log(`Error during login: ${err.message}`);
      return {
        error: {
          message:'Error al obtener datos.'
        }
      }
    }
  }
  async signUp(username,pass) {
    try{
      const result = await this.sql(`insert into users (username,password) values ($1,$2);`, [username,pass]);
      return result;
    }catch(err){
      console.log(`Error during signUp: ${err}`);
      return {
        error: {
          message:'Error al guardar datos'
        }
      }
    }
  }
}