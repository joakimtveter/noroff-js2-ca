import { isLoggedIn } from './utils/storage.js';

// redirect to index.html if user is already logged in
if (isLoggedIn()) {
    window.location.pathname = '/posts/';
} else {
    window.location.pathname = '/login.html';
}

/**
 * Logs out the user and redirects to login page
 * @returns {void} Delete user object from local storage and redirect to login.html
 */
function logOut() {
    localStorage.removeItem('user');
    window.location.pathname = 'login.html';
}

const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', logOut);
