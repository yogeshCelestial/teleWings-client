import { loginFailureHandler, loginSuccessHandler, signUpFailedSuccessHandler, signUpSuccessHandler } from "./handlers.js"
import httpHelper, { ObjReq } from "./httpHelper.js"
declare var jwt_decode: (token: string) => any;

export class Auth {
    static login(email: string, password: string) {
        const data = JSON.stringify({
            email,
            password,
        })
        const reqObj: ObjReq = {
            data: data,
            method: 'POST',
            url: 'signIn',
            authToken: '',
        }
        httpHelper(reqObj, loginSuccessHandler, loginFailureHandler)
    }
    static signup(name: string, email: string, password: string) {
        const data = JSON.stringify({
            name,
            email,
            password,
        })
        const reqObj: ObjReq = {
            data: data,
            method: 'POST',
            url: 'signUp',
            authToken: '',
        }
        httpHelper(reqObj, signUpSuccessHandler, signUpFailedSuccessHandler)
    }
}

export const checkAuthentication = () => {
    const authToken = localStorage.getItem('authToken') || '';
    if (authToken) {
        const payload = jwt_decode(authToken);
        const currentTime = new Date();
        const expTime = new Date(payload.exp * 1000)
        return expTime > currentTime;     
    } else {
        return false;
    }
}

export const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    window.location.href = '/login';
}
