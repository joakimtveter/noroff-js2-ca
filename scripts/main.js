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
