import { Auth, logout } from "./auth.js";
import { Router } from "./router.js";

document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content')! as HTMLDivElement;

    //Route when first time page loads
    Router();
    // Login form submission
    contentDiv.addEventListener('submit', (event: SubmitEvent) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        if (form.id === 'login-form') {
            const email = (form.querySelector('#login-email')! as HTMLInputElement).value;
            const password = (form.querySelector('#login-password')! as HTMLInputElement).value;
            // Call login function with email and password
            Auth.login(email, password);
        } else if (form.id === 'signup-form') {
            const username = (form.querySelector('#signup-username')! as HTMLInputElement).value;
            const email = (form.querySelector('#signup-email')! as HTMLInputElement).value;
            const password = (form.querySelector('#signup-password')! as HTMLInputElement).value;
            const repeatPass = (form.querySelector('#repeat-signup-password')! as HTMLInputElement).value;
            if (password === repeatPass) {
                // Call signup function with username, email, and password
                Auth.signup(username, email, password);
            }
        }
    });

    contentDiv.addEventListener('click', (event: any) => {
        if (event.target && event.target.id === 'logout') {
            logout();
        }
    });

});