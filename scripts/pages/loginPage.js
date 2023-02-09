import { logIn } from '../client.js';
import { isLoggedIn } from '../utils/storage.js';

if (isLoggedIn()) {
    window.location.pathname = '/posts/index.html';
}

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    await logIn(email, password);
});

// joakim.tveter@stud.noroff.no
