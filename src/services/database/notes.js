import { neon } from '@neondatabase/serverless';
import {router} from '../../router'
import { globalState } from '../../store/store';
export default class Notes {

  constructor() {
    this.sql = neon(import.meta.env.VITE_DATABASE_URL);
  }


  async loadAllNotes() {
    try {
      const user = globalState().getUserLogin;
      const result = await this.sql(`
        select notes.id,notes.title,notes.hold,TO_CHAR(notes.updated_at, 'YYYY/MM/DD HH:mm:ss') AS updated_at 
          from public.users_notes
          inner join public.notes notes on users_notes.note_id = notes.id
          where public.users_notes.user_id = $1
         order by notes.hold DESC, notes.updated_at DESC;`,[user.id]);
      return result;
    } catch (err) {
      console.log(err);
      router.push('/404');
    }
  }

  async findNoteById(id) {
    try {
      const result = await this.sql(`select 
          notes.id,
          notes.title,
          notes.content,
          TO_CHAR(notes.updated_at, 'YYYY/MM/DD HH:mm:ss') AS updated_at
        from public.notes notes where id = $1;`, [id]);
      return result[0];
    } catch (err) {
      console.log(err);
      router.push('/404');
    }
  }

  async saveNewNote(name, time) {
    try {
      const userId = globalState().getUserLogin.id;
      const resultNote = await this.sql('INSERT INTO notes (title,updated_at) values ($1,$2) RETURNING *', [name, time]);
      await this.sql('INSERT INTO users_notes (user_id,note_id) values ($1,$2) RETURNING *', [userId, resultNote[0].id]);
      return resultNote[0];
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
      await this.sql(`
        WITH deleted_notes AS (
          DELETE FROM notes WHERE id = $1 RETURNING id
        )
        DELETE FROM users_notes WHERE note_id IN (SELECT id FROM deleted_notes);
      `, [id]);

      return {
        status: 200,
      };
    } catch (err) {
      console.log(err);
      router.push('/404');
    }
  }
}