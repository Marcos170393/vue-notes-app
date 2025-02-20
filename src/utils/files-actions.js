import { createNote, loadFiles, findNote, editNote, deleteNote, updateHold, editTitle } from "../renderer";
import { globalState } from "../store/store";

export const loadNotesAction = async () => {
    try{
        return await loadFiles();
    }catch(error){
        throw Error(error);
    }
};

export const findNotesAction = async (id) => {
    return await findNote(id);
}

export const createNoteAction = async (name) => {
    try{
        const response = await createNote(name);
        if(response.id){
            globalState().showMessage("Let's go!",'success');
        }else{
            globalState().showMessage('mmm.. something went wrong...','danger');
        };
        
        return response;

    }catch(error){
        throw Error(error);
    }

};

export const updateNoteAction = async(id,data) => {
    const response = await editNote(id,data);
    if(response.status == 200){
        globalState().showMessage('Ready!','success');
    }else{
        globalState().showMessage('mmm.. something went wrong...','danger');
    };
    return response;
}
export const updateNoteTitleAction = async(id,title) => {
    const response = await editTitle(id,title);
    if(response.status == 200){
        globalState().showMessage('Ready!','success');
    }else{
        globalState().showMessage('mmm.. something went wrong...','danger');
    };
    return response;
}

export const updateNoteHoldState = async (id,hold) => {
    const response = await updateHold(id,hold);
    if(response.status != 200){
        globalState().showMessage('mmm.. something went wrong...','danger');
    }
    return response;
}

export const deleteNoteAction = async(id) => {
    const response = await deleteNote(id);
    if(response.status == 200){
        globalState().showMessage("It's done!",'success');
    }else{
        globalState().showMessage('mmm.. something went wrong...','danger');
    }
    return response;


}