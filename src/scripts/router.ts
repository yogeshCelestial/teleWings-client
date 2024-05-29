import { openChatList } from "./app.js";
import { checkAuthentication } from "./auth.js";
const urlPageTitle = 'TeleWings'

document.addEventListener("click", (e: any) => {
	const { target } = e;
	if (!target.matches("a")) {
		return;
	}
	e.preventDefault();
	urlRoute(e);
});

const urlRoutes: any = {
	404: {
		template: "/src/screens/404.html",
		title: "404 | " + urlPageTitle,
	},
	"/": {
		template: "/src/screens/home.html",
		title: "Home | " + urlPageTitle,
	},
	"/login": {
		template: "/src/screens/login.html",
		title: "Log In | " + urlPageTitle,
	},
	"/signup": {
		template: "/src/screens/signup.html",
		title: "Create Account | " + urlPageTitle,
	},
};

export const urlRoute = (event: any) => {
	event = event || window.event; // get window.event if event argument not provided
	event.preventDefault();
	window.history.pushState({}, "", event.target.href);
	urlLocationHandler();
};

export const urlLocationHandler = async () => {
	let location = window.location.pathname; // get the url path
    const isAuthenticated = checkAuthentication();
    if (isAuthenticated) {
       location = '/';
    } else {
        localStorage.clear();
        if (location !== '/login' && location !== '/signup') {
            location = '/login'
        }
    }
    const route: any = urlRoutes[location] || urlRoutes["404"];
    const html = await fetch(route.template).then((response) => response.text());
	(document.getElementById("content")!).innerHTML = html;
    if (location === '/' || location === '/home') {
        openChatList(document.getElementById('content')! as HTMLDivElement);
    }
	document.title = route.title;
};

// add an event listener to the window that watches for url changes
window.onpopstate = urlLocationHandler;
