import { USERS_DELETED, USERS_EDIT, USERS_EDIT_SAVE, USERS_ALL } from "../../constants/actionTypes";
import studentsService from "../services/studentsService";

export const StudentsAll = () => async (dispatch) => {
    try {
        const {data} = await studentsService.all();
        dispatch({type: USERS_ALL, payload: data});
        console.log(data);
        return Promise.resolve();
    } 
    catch (err) {
        return Promise.reject(err.response.data);
    }
}

export const StudentDelete = (id) => async (dispatch) => {
        try {
            const { data } = await studentsService.delete(id);
            dispatch({ type: USERS_DELETED, payload: id });
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err.response.data);
        }
    }
    export const StudentEdit = (id) => async (dispatch) => {
        try {
            const { data } = await studentsService.edit(id);
            dispatch({ type: USERS_EDIT, payload: data });
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err.response.data);
        }
    }
    export const StudentEditSave = (student) => async (dispatch) => {
        try {
            const { data } = await studentsService.save(student);
            dispatch({ type: USERS_EDIT_SAVE, payload: data });
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err.response.data);
        }
    }