import { REGISTER } from "../../constants/actionTypes";
import authService from "../services/authService";

export const RegisterUser = (model) => async (dispatch) => {
    try {
        const result = await authService.register(model); /*Call our func and give data to it*/
        dispatch({type: REGISTER}); /*Call dispatch and send action to redux*/
        //localStorage.authToken = token; /*Save token to localStorage*/
        //const token = result.data.token;
        //dispatch(authUser(token));
        return Promise.resolve(result);
    } 
    catch (err) {
        return Promise.reject(err);
    }
}
export const LoginUser = (model) => async (dispatch) => {
    try {
        const result = await authService.login(model); /*Call our func and give data to it*/
        //dispatch({type: LOGIN}); /*Call dispatch and send action to redux*/
        //const token = result.data.token;
        //localStorage.authToken = token;
        //dispatch(authUser(token));
        return Promise.resolve(result); /*Return ok*/
    } 
    catch (err) {
        return Promise.reject(err.response.data); /*return errors*/
    }
}