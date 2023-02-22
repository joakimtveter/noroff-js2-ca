import { isLoggedIn, logout } from './utils/storage.js';

if (!isLoggedIn()) window.location.pathname = '/login.html';

// Enable logout button
document.getElementById('logout-button').addEventListener('click', logout);
