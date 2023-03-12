/**
 * Get the access token for logged in user
 * @returns {string} - Access token for logged in user
 */
function getAccessToken() {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) return null;
    return accessToken;
}

export { getAccessToken };
