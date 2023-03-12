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

export { getUserObject };
