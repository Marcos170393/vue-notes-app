import Notes from './services/database/notes'
import DateInfo from './utils/date-info'
const dbNotes = new Notes();
const dateInfo = new DateInfo();

const now = dateInfo.getCurrentTime();
//Open Browser Links
export function openGitUrl(){
}

export function openLinkedInUrl(){
}
export function openDropBoxUrl(){
}

// Files actions
export async function loadFiles(){
    return await dbNotes.loadAllNotes();
}

export async function findNote(id){
    return await dbNotes.findNoteById(id);
}

export async function createNote(name){
    return await dbNotes.saveNewNote(name,now);
}

export async function editNote(id,data){
    return await dbNotes.updateNote(id,data,now);
}

export async function editTitle(id,title){
    return await dbNotes.updateNoteTitle(id,title,now);
}

export async function updateHold(id,hold) {
    return await dbNotes.updateNoteHoldState(id,hold,now);
}

export async function deleteNote(id){
    return await dbNotes.deleteNoteById(id);
}
