import { COURSE_ALL, DELETE_COURSE, CREATE_COURSE, EDIT_COURSE, EDIT_SAVE_COURSE, SIGN_UP_COURSE} from "../../constants/actionTypes";
import courseService from "../services/courseService";

export const CourseAll = () => async (dispatch) => {
    try {
        const {data} = await courseService.all();
        dispatch({type: COURSE_ALL, payload: data});
        return Promise.resolve();
    } 
    catch (err) {
        return Promise.reject(err.response.data);
    }
}

export const CourseDelete = (id) => async (dispatch) => {
    try {
        const {data} = await courseService.delete(id);
        dispatch({type: DELETE_COURSE, payload: id});
        return Promise.resolve();
    } 
    catch (err) {
        return Promise.reject(err.response.data);
    }
}

export const CreateCourse = (model) => async (dispatch) => {
    try {
        const result = await courseService.create(model);
        dispatch({type: CREATE_COURSE});
        return Promise.resolve(result);
    } 
    catch (err) {
        return Promise.reject(err.response.data);
    }
}

export const EditCourse = (model) => async (dispatch) => {
    try {
        const result = await courseService.save(model);
        dispatch({type: EDIT_SAVE_COURSE});
        return Promise.resolve(result);
    } 
    catch (err) {
        return Promise.reject(err.response.data);
    }
}

export const SignUpCourse = (data) => async (dispatch) => {
    try {
        const result = await courseService.signup(data);
        dispatch({type: SIGN_UP_COURSE});
        return Promise.resolve(result);
    } 
    catch (err) {
        return Promise.reject(err.response.data);
    }
}