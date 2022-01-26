import { USERS_ALL } from "../../constants/actionTypes";
import paginationService from "../services/paginationService";

export const StudentsAll = () => async (dispatch) => {
    try {
        const {data} = await paginationService.all();
        dispatch({type: USERS_ALL, payload: data.result.students});
        return Promise.resolve(data.result);
    } 
    catch (err) {
        return Promise.reject(err.response.data);
    }
}

export const Pagging = (values) => async (dispatch) => {
    try {
        const {data} = await paginationService.sorting(values);
        dispatch({type: USERS_ALL, payload: data.result.students});
        return Promise.resolve(data);
    } 
    catch (err) {
        return Promise.reject(err.response.data);
    }
}