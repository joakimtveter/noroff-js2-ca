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

export { getUserName };
