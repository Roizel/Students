import { USERS_ALL } from "../constants/actionTypes";

const initialState = {
    list: [],
}

const paginationReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USERS_ALL: {
            return {
                ...state,
                list: payload
            }
        }
        default:
            return state;
    }
}
export default paginationReducer