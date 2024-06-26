const loginSuccessHandler = (response: any) => {
    localStorage.clear();
    localStorage.setItem('authToken', response.authToken);
    localStorage.setItem('userId', response.body.userid);
    document.title = 'Chat | TeleWings'
    window.location.href = '/';
}

const loginFailureHandler = (response: any) => {
    alert('Invalid Credentials! Please Try Again');
}

const signUpSuccessHandler = (resp: any) => {
    document.title = 'Login | TeleWings'
    window.location.href = '/login';
}

const signUpFailedSuccessHandler = () => {
    console.log('Signed Up Failed');
}

export { loginSuccessHandler, loginFailureHandler, signUpSuccessHandler, signUpFailedSuccessHandler };
