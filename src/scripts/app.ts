import { Auth, logout } from "./auth.js";
import { searchUsers } from "./httpHelper.js";
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
            displaySerachResults(users, contentDiv);
        }
        if (event.target && event.target.id === 'chats') {
            // openChatRoom();
            openChatList(contentDiv); 
        }
        if (event.target && event.target.id === 'search') {
            console.log('search clicked');
            const mainDiv = contentDiv.querySelector('#mainContent')! as HTMLDivElement;
            mainDiv.innerHTML = `<div id="searchContainer" class="mainDiv">
            <input type="text" id="searchInput" name="search" />
            <button id="searchButton" type="button">Search</button>
            <button id="logout">logout</button>
        </div>`
        }
    });
});

const displaySerachResults = (users: User[], contentDiv: HTMLDivElement) => {
    let html;
    if (users.length) {
        html = `
                <h2>Search Results: </h2>
                <ul type="none">
                ${users.map((user: User) => `<a href=/user/${user.userid} data-elem=${JSON.stringify(user)} id="userElem" type="button">${user.name}</a>`)}
                </ul>`
    } else {
        html = `
                <h2>Search Results: </h2>
                <h3>No Matching Results</h3>`
    }
    contentDiv.getElementsByTagName('main')[0].innerHTML = html;
}

export const openChatList = (contentDiv: HTMLDivElement) => {
    debugger;
    const mainDiv = contentDiv.querySelector('#mainContent')! as HTMLDivElement;
    mainDiv.innerHTML = `<div id="chatsContainer">
            <ul type="none">
                <li>One</li>
                <li>Two</li>
                <li>Three</li>
            </ul>
        </div>`;
}