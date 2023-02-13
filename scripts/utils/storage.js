/**
 * Get the access token for logged in user
 * @returns {string} - Access token for logged in user
 */
function getAccessToken() {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) return null;
    return accessToken;
}

/**
 * @typedef {object} currentUser
 * @property {string} currentUser.name - Username
 * @property {string} currentUser.email - User email
 * @property {string} currentUser.avatar - Avatar URL
 * @property {string} currentUser.banner - Banner URL
 *
 */

/**
 * Get the user object for logged in user
 * @returns {currentUser} - User object for logged in user
 */
async function getUserObject() {
    const userString = localStorage.getItem('user');
    if (!userString) return null;
    const user = JSON.parse(userString);
    if (!user) return null;
    return user;
}

/**
 * Function to check if a user is logged in.
 * @returns {boolean} -  true if user is logged in, false if not
 */
async function isLoggedIn() {
    const accessToken = getAccessToken();
    if (!accessToken) return false;
    return true;
}

/**
 * Function to log out current user
 * @returns {void} - Removes user object and accesstoken from local storage and redirect to login.html
 */
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.pathname = '/login.html';
}

export { getAccessToken, getUserObject, isLoggedIn, logout };
