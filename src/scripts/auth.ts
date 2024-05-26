import { loginFailureHandler, loginSuccessHandler, signUpFailedSuccessHandler, signUpSuccessHandler } from "./handlers.js"
import httpHelper, { ObjReq } from "./httpHelper.js"

export class Auth {
    static login(email: string, password: string) {
        const data = JSON.stringify({
            email,
            password,
        })
        const reqObj: ObjReq = {
            data: data,
            method: 'POST',
            url: 'signIn'
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
            url: 'signUp'
        }
        httpHelper(reqObj, signUpSuccessHandler, signUpFailedSuccessHandler)
        // Simulate user creation (replace with actual user creation logic)
    }
}
