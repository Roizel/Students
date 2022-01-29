import { USERS_ALL, COURSE_ALL } from "../constants/actionTypes";

const initialState = {
    listOfUsers: [],
    listOfCourses: []
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
        default:
            return state;
    }
}
export default paginationReducer