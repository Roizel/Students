import { REGISTER, LOGIN, LOGOUT} from "../constants/actionTypes";

const initialState = {
    isAuth: false,
    isAdmin: false,
    user: {}
}

const authReducer = (state = initialState, action) => {
    const {type, payload, role} = action;
    switch(type) {
        case REGISTER:{
            return {
                isAuth: false
            }
        }
        case LOGIN: {
            return {
                isAuth: true,
                isAdmin: role,
                user: payload
            }
        }
        case LOGOUT: {
            return {
                isAuth: false,
                isAdmin: false
            }
        }
        default:
            return state;
    }
}
export default authReducer