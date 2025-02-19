import { neon } from '@neondatabase/serverless';
export default class Auth {

  constructor() {
    this.sql = neon(import.meta.env.VITE_DATABASE_URL);
  }


  async login(document,pass) {
    try{
      const result = await this.sql(`select * from users where document = $1 and password = $2;`, [document,pass]);
      return result[0];
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