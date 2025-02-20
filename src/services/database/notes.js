import { neon } from '@neondatabase/serverless';
import {router} from '../../router'
export default class Notes {

  constructor() {
    this.sql = neon(import.meta.env.VITE_DATABASE_URL);
  }


  async loadAllNotes() {
    try {
      const result = await this.sql(`select id,title,hold,TO_CHAR(updated_at, 'YYYY/MM/DD HH:mm:ss') AS updated_at from notes order by hold DESC, updated_at DESC;`);
      return result;
    } catch (err) {
      console.log(err);
      router.push('/404');
    }
  }

  async findNoteById(id) {
    try {
      const result = await this.sql(`select * from notes where id = $1;`, [id]);
      return result[0];
    } catch (err) {
      console.log(err);
      router.push('/404');
    }
  }

  async saveNewNote(name, time) {
    try {
      const result = await this.sql('INSERT INTO notes (title,updated_at) values ($1,$2) RETURNING *', [name, time]);
      return result[0];
    } catch (err) {
      console.log(err);
      router.push('/404');
    }
  }

  async updateNote(id, data, time) {
    try {
      await this.sql(`UPDATE notes SET content = $1,updated_at = $2 where id = $3`, [data, time, id]);
      return {
        status: 200,
        updated_at: time
      }
    } catch (err) {
      console.log(err);
      router.push('/404');
    }
  }

  async updateNoteTitle(id, title, time) {
    try {
      await this.sql(`UPDATE notes SET title = $1,updated_at = $2 where id = $3`, [title, time, id]);
      return {
        status: 200,
        updated_at: time
      }
    } catch (err) {
      console.log(err);
      router.push('/404');
    }
  }

  async updateNoteHoldState(id, holdState, time) {
    try {
      await this.sql(`UPDATE notes SET hold = $1,updated_at = $2 where id = $3`, [holdState, time, id]);
      return {
        status: 200,
      }
    } catch (err) {
      console.log(err);
      router.push('/404');
    }
  }

  async deleteNoteById(id) {
    try {
      await this.sql(`DELETE FROM notes where id = $1 `, [id]);

      return {
        status: 200,
      };
    } catch (err) {
      console.log(err);
      router.push('/404');
    }
  }
}