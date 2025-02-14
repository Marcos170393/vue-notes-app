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
            globalState().showMessage('Que fluyan las ideas!!','create');
        }else{
            globalState().showMessage('mmm.. algo salio mal...','error');
        };
        
        return response;

    }catch(error){
        throw Error(error);
    }

};

export const updateNoteAction = async(id,data) => {
    const response = await editNote(id,data);
    if(response.status == 200){
        globalState().showMessage('Todo guardado!!','update');
    }else{
        globalState().showMessage('Error al actualizar nota','error');
    };
    return response;
}
export const updateNoteTitleAction = async(id,title) => {
    const response = await editTitle(id,title);
    if(response.status == 200){
        globalState().showMessage('Todo guardado!!','update');
    }else{
        globalState().showMessage('Error al actualizar nota','error');
    };
    return response;
}

export const updateNoteHoldState = async (id,hold) => {
    const response = await updateHold(id,hold);
    if(response.status != 200){
        globalState().showMessage('Error al actualizar nota','error');
    }
    return response;
}

export const setLocationAction = async () => {
    try{
        const path = await setFolderLocation();
        const store = globalState();
        console.log(`FROM ACTION ${path}`)
        store.setLocation(path)
    }catch(error){
        throw Error(error);
    }
}

export const deleteNoteAction = async(id) => {
    const response = await deleteNote(id);
    if(response.status == 200){
        globalState().showMessage('Ya no sera un problema...','delete');
    }else{
        globalState().showMessage('Error al eliminar nota','error');
    }
    return response;


}