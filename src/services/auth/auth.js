import { neon } from '@neondatabase/serverless';
import { globalState } from '../../store/store';
import { router } from '../../router';
import bcrypt from 'bcryptjs';
export default class Auth {

  constructor() {
    this.sql = neon(import.meta.env.VITE_DATABASE_URL);
  }


  async login(username,pass,remaind) {
    try{
      const result = await this.sql(`select * from users where username = $1;`, [username]);
      if(result.length == 0){
        globalState().showMessage('Username or Password incorrect','danger');
        return false;
      }
      const res = await bcrypt.compare(pass,result[0].password);
      if(!res){
      }

      globalState().showMessage(`Welcome back ${result[0].username} !!`,'success');
      globalState().setUserLogin(result[0],remaind);
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
      const salt = await bcrypt.genSalt();
      const hashPass = await bcrypt.hash(pass,salt);
      const result = await this.sql(`insert into users (username,password) values ($1,$2);`, [username,hashPass]);
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

  async logout(){
    globalState().logOut();
    router.push('/login');
  }
}