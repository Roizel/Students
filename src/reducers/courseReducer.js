import { COURSE_ALL, DELETE_COURSE, CREATE_COURSE, 
    EDIT_COURSE, EDIT_SAVE_COURSE, GET_STUDENTS_COURSES, UNSUBSCRIBE} from "../constants/actionTypes";

const initialState = {
    list: [],
    editedCourse: {},
    studentsCourses: [],
}

const courseReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case COURSE_ALL: {
            return {
                ...state,
                list: payload
            }
        }
        case CREATE_COURSE: {
            return {
                ...state,
                list: payload
            }
        }
        case DELETE_COURSE: {
            return {
                ...state,
                list: state.list.filter(item => item.id !== payload)
            };
        }
        case EDIT_COURSE: {
            return {
                ...state,
                editedStudent: payload
            }
        }
        case EDIT_SAVE_COURSE: {
            return {
                ...state
            }
        }
        case GET_STUDENTS_COURSES: {
            return {
                studentsCourses: payload
            }
        }
        case UNSUBSCRIBE: {
            return {
                ...state,
            }
        }

        default:
            return state;
    }
}
export default courseReducer