async function getAccessToken() {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
        return null;
    }
    return accessToken;
}

async function getUserObject() {
    const userString = localStorage.getItem('user');
    if (!userString) return null;
    const user = JSON.parse(userString);
    if (!user) return null;
    return user;
}

async function isLoggedIn() {
    const accessToken = await getAccessToken();
    if (!accessToken) return false;
    return true;
}

export { getAccessToken, getUserObject, isLoggedIn };
