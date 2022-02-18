import { USERS_ALL, COURSE_ALL, USERS_DELETED, DELETE_COURSE, GET_STUDENT_COURSE } from "../constants/actionTypes";

const initialState = {
    listOfUsers: [],
    listOfCourses: [],
    courseStudent: []
}

const paginationReducer = (state = initialState, action) => {
    const { type, payload } = action;
    
    switch (type) {
        case USERS_ALL: {
            return {
                ...state,
                listOfUsers: payload
            }
        }
        case COURSE_ALL: {
            return {
                ...state,
                listOfCourses: payload
            }
        }
        case GET_STUDENT_COURSE: {
            return {
                ...state,
                courseStudent: payload
            }
        }
        case USERS_DELETED: {
            return {
                ...state,
                listOfUsers: state.listOfUsers.filter(item => item.id !== payload)
            };
        }
        case DELETE_COURSE: {
            return {
                ...state,
                listOfCourses: state.listOfCourses.filter(item => item.id !== payload)
            };
        }
        default:
            return state;
    }
}
export default paginationReducer