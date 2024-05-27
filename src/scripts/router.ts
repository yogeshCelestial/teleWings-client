import { checkAuthentication, logout } from "./auth.js";

export function Router() {
    // Initial page load or when navigating back/forward
    window.addEventListener('hashchange', () => {
        navigateTo(getCurrentRoute());
    });

    // Initial page load
    navigateTo(getCurrentRoute());

    // Helper function to get current route from URL
    function getCurrentRoute() {
        const hash = window.location.hash.slice(1)
        const isAuthenticated = checkAuthentication();
        console.log('isAuth', isAuthenticated);
        let routeTo = '';
        if (isAuthenticated) {
            routeTo = 'home'
        } else {
            logout();
            routeTo = hash;
        }
        return routeTo;
    }
}

// Router logic
export function navigateTo(path: string) {
    const contentDiv = document.getElementById('content')! as HTMLDivElement;
    fetch(`/src/screens/${path}.html`)
        .then(response => response.text())
        .then(html => {
            contentDiv.innerHTML = html;
            history.pushState({ page: path }, 'TeleWings', `#${path}`);
        })
        .catch(error => {
            console.error('Error loading page:', error)
        });
}