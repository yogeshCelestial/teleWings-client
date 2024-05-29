import { Auth, logout } from "./auth.js";
import httpHelper, { searchUsers } from "./httpHelper.js";
import { urlLocationHandler } from "./router.js";

type User = {
    userid: string;
    name: string;
}

document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content')! as HTMLDivElement;

    //Route when first time page loads
    urlLocationHandler();
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

    contentDiv.addEventListener('click', async (event: any) => {
        if (event.target && event.target.id === 'logout') {
            logout();
        }
        if (event.target && event.target.id === 'searchButton') {
            const searchVal = (contentDiv.querySelector('#searchInput')! as HTMLInputElement).value;
            const users = await searchUsers(searchVal);
            // displaySerachResults(users, contentDiv);
            renderContacts(users, contentDiv);
        }
        if (event.target && event.target.id === 'chats') {
            const reqObj = {
                method: 'GET',
                data: null,
                authToken: localStorage.getItem('authToken'),
                url: `chats/?senderId=${localStorage.getItem('userId')}`

            }
            httpHelper(reqObj, () => console.log('Resolved'), () => console.log('Failed'));
        }
        if (event.target && event.target.id === 'search') {
            const mainDiv = contentDiv.querySelector('#mainContent')! as HTMLDivElement;
            mainDiv.innerHTML = `<div id="searchContainer" class="mainDiv">
            <input type="text" id="searchInput" name="search" />
            <button id="searchButton" type="button">Search</button>
            <button id="logout">logout</button>
            </div>`
        }
    });
});




const renderContacts = (userList: User[], elem: HTMLDivElement) => {
    const ul = document.createElement('ul');
    userList.forEach((element) => {
        const li = document.createElement('li');
        li.textContent = element.name + element.userid;
        ul.appendChild(li);
    });
    elem.innerHTML = String(ul);
}