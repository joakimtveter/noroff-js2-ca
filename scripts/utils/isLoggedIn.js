import { getAccessToken } from './getAccessToken.js';

/**
 * Function to check if a user is logged in.
 * @returns {boolean} -  true if user is logged in, false if not
 */
function isLoggedIn() {
    const accessToken = getAccessToken();
    if (!accessToken) return false;
    return true;
}

export { isLoggedIn };
