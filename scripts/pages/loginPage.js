import { logIn, isLoggedIn } from '../client.js';

if (isLoggedIn()) {
    window.location.pathname = 'index.html';
}

const loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    await logIn(email, password);
});
