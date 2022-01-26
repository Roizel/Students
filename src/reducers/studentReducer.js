import { USERS_DELETED, USERS_EDIT, USERS_EDIT_SAVE} from "../constants/actionTypes";

const initialState = {
    list: [],
    editedStudent: {}
}

const studentReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
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