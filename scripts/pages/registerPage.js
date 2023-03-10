import { register } from '../client.js';
import { isLoggedIn } from '../utils';

// redirect to index.html if user is already logged in
if (isLoggedIn()) {
    window.location.pathname = 'index.html';
}

const registerButton = document.getElementById('register-button');

registerButton.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    register(name, email, password);
});
