import { neon } from '@neondatabase/serverless';
export default class Auth {

  constructor() {
    this.sql = neon(import.meta.env.VITE_DATABASE_URL);
    this.crypt = require('crypto');
  }

  async hashPassword(pass){
    const hash = this.crypt.createHash('sha256');
    hash.update(pass);
    return hash.digest('hex');
  }

  async login(document,pass) {
    try{
      const hashedPass = await this.hashPassword(pass);
      const result = await this.sql(`select * from users where document = $1 and password = $2;`, [document,hashedPass]);
      return result[0];
    }catch(err){
      throw err;
    }
  }
  async signUp(document,pass) {
    try{
      const hashedPass = await this.hashPassword(pass);
      const result = await this.sql(`insert into users (document,password) values ($1,$2) RETURNING *;`, [document,hashedPass]);
      return result[0];
    }catch(err){
      throw err;
    }
  }
}