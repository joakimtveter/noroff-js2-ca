/**
 * Logs out current user, by deleting the token and user object from local storage.
 * @returns {void} - Removes user object and accesstoken from local storage and redirect to login.html
 */
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.pathname = '/login.html';
}

export { logout };
