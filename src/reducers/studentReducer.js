import { USERS_ALL, USERS_DELETED, USERS_EDIT, USERS_EDIT_SAVE} from "../constants/actionTypes";

const initialState = { /*Our state in reducer*/
    list: [],
    editedStudent: {}
}

const studentReducer = (state = initialState, action) => {
    const { type, payload } = action;
    console.log("payload", payload);
    switch (type) {
        case USERS_ALL: {
            return {
                ...state,
                list: payload
            }
        }
        case USERS_DELETED: {
            return {
                ...state,
                list: state.list.filter(item => item.id !== payload)
            };
        }
        case USERS_EDIT: {
            return {
                ...state,
                editedStudent: payload
            }
        }
        case USERS_EDIT_SAVE: {
            return {
                ...state
            }
        }

        default:
            return state;
    }
}
export default studentReducer