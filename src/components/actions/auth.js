import { REGISTER, LOGIN, LOGOUT } from "../../constants/actionTypes";
import authService from "../services/authService";
import jwt from 'jsonwebtoken';
import setAuthorizationToken from "../../utils/setAuthorizationToken";

export const RegisterUser = (model) => async (dispatch) => {
    try {
        const result = await authService.register(model);
        dispatch({type: REGISTER});
        const token = result.data.token;
        dispatch(authUser(token));
        localStorage.authToken = token;
        return Promise.resolve(result);
    } 
    catch (err) {
        return Promise.reject(err);
    }
}
export const LoginUser = (model) => async (dispatch) => {
    try {
        const result = await authService.login(model);
        const token = result.data.token;
        const role = result.data.isAdmin;
        console.log(result.data);
        localStorage.authToken = token;
        localStorage.role = role;
        dispatch(authUser(token, role));
        return Promise.resolve(result);
    } 
    catch (err) {
        return Promise.reject(err.response.data);
    }
}

export const authUser = (token, role) => async (dispatch) => {
    var user = jwt.decode(token);
    setAuthorizationToken(token, role);
    let boolrole = null;
    if(role === 'true' || role === true) {boolrole = true;}
    else {boolrole = false}
    dispatch({type: LOGIN, payload: user, role: boolrole});
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    dispatch({
        type: LOGOUT
    })
}
