import { USERS_ALL, COURSE_ALL } from "../../constants/actionTypes";
import paginationService from "../services/paginationService";

export const StudentsAll = () => async (dispatch) => {
    try {
        const {data} = await paginationService.allStudents();
        dispatch({type: USERS_ALL, payload: data.result.students});
        return Promise.resolve(data.result);
    } 
    catch (err) {
        return Promise.reject(err.response.data);
    }
}

export const PaggingStudents = (values) => async (dispatch) => {
    try {
        const {data} = await paginationService.sortingStudents(values);
        dispatch({type: USERS_ALL, payload: data.result.students});
        return Promise.resolve(data);
    } 
    catch (err) {
        return Promise.reject(err.response.data);
    }
}

export const CourseAll = () => async (dispatch) => {
    try {
        const {data} = await paginationService.allCourses();
        dispatch({type: COURSE_ALL, payload: data.result.courses});
        return Promise.resolve(data.result);
    } 
    catch (err) {
        return Promise.reject(err.response.data);
    }
}

export const PaggingCourses = (values) => async (dispatch) => {
    try {
        const {data} = await paginationService.sortingCourses(values);
        dispatch({type: COURSE_ALL, payload: data.result.courses});
        return Promise.resolve(data.result);
    } 
    catch (err) {
        return Promise.reject(err.response.data);
    }
}