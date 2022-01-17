import { REGISTER, LOGIN, LOGOUT } from "../../constants/actionTypes";
import authService from "../services/authService";
import jwt from 'jsonwebtoken';
import setAuthorizationToken from "../../utils/setAuthorizationToken";

export const RegisterUser = (model) => async (dispatch) => {
    try {
        const result = await authService.register(model);
        dispatch({type: REGISTER});
        const token = result.data.token;
        dispatch(authUser(token, false));
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

export const GetUserFromFacebook = (accessToken) => {
    try {
        const result = authService.GetDataFromFacebook(accessToken);
        return Promise.resolve(result);
    } 
    catch (err) {
        return Promise.reject(err);
    }
}

export const RegisterFacebook = (data) => async (dispatch) => {
    try {
        const result = await authService.RegisterWithFacebook(data);
        dispatch({type: REGISTER});
        const token = result.data;
        console.log(result);
        dispatch(authUser(token, false));
        localStorage.authToken = token;
        return Promise.resolve(result);
    } 
    catch (err) {
        return Promise.reject(err);
    }
}

export const LoginFacebook = (data) => async (dispatch) => {
    try {
        const result = await authService.LoginFacebook(data);
        const token = result.data.token;
        const role = result.data.isAdmin;
        console.log(result.data);
        localStorage.authToken = token;
        localStorage.role = role;
        dispatch(authUser(token, role));
        return Promise.resolve(result);
    } 
    catch (err) {
        return Promise.reject(err);
    }
}


export const logout = () => (dispatch) => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    dispatch({
        type: LOGOUT
    })
}
