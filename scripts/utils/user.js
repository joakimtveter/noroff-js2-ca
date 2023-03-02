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
function getUserObject() {
    const userString = localStorage.getItem('user');
    if (!userString) return null;
    const user = JSON.parse(userString);
    if (!user) return null;
    return user;
}

/**
 * Get the user object for logged in user
 * @returns {string} - Username of the logged in user
 */
function getUserName() {
    const userString = localStorage.getItem('user');
    if (!userString) return null;
    const user = JSON.parse(userString);
    if (!user) return null;
    return user.name;
}

/**
 * Function to check if a user is logged in.
 * @returns {boolean} -  true if user is logged in, false if not
 */
function isLoggedIn() {
    const accessToken = getAccessToken();
    if (!accessToken) return false;
    return true;
}

export { getAccessToken, getUserObject, getUserName, isLoggedIn };
