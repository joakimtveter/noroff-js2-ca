import { getUserObject, isLoggedIn, logout } from './utils/storage.js';

if (!isLoggedIn()) window.location.pathname = '/login.html';

// Enable logout button
document.getElementById('logout-button').addEventListener('click', logout);

const user = getUserObject();
if (user.avatar) {
    document.getElementById('header-avatar').src = user.avatar;
}
