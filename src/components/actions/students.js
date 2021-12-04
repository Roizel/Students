import { USERS_ALL, USERS_DELETED, USERS_EDIT, USERS_EDIT_SAVE} from "../../constants/actionTypes";
import studentsService from "../services/studentsService";

export const UsersAll = () => async (dispatch) => {
    try {
        const {data} = await studentsService.all();
        dispatch({type: USERS_ALL, payload: data});
        return Promise.resolve();
    } 
    catch (err) {
        return Promise.reject(err.response.data);
    }
}
export const UserDelete = (id) => async (dispatch) => {
    try {
        const {data} = await studentsService.delete(id);
        dispatch({type: USERS_DELETED, payload: id});
        return Promise.resolve();
    } 
    catch (err) {
        return Promise.reject(err.response.data);
    }
}