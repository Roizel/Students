import http from "../../http_common";
class AuthService {

    register(data) {
        return http.post("api/account/register", data,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    login(data) {
        return http.post("api/account/login", data,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    GetDataFromFacebook(accessToken) {
        return http.post("api/auth-facebook/facebook-getuserdata", accessToken,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    
    RegisterWithFacebook(data) {
        return http.post("api/auth-facebook/facebook-register", data,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    LoginFacebook(accessToken) {
        return http.post("api/auth-facebook/facebook-login", accessToken,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}

export default new AuthService();