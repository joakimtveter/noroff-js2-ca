import { isLoggedIn } from '../utils.js';
import { logIn } from '../client.js';
import { validateLoginForm, clearFormErrors, handleFormErrors } from '../validation.js';

if (isLoggedIn()) {
    window.location.pathname = '/posts/index.html';
}

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errors = validateLoginForm(email, password);
    if (errors.length > 0) {
        handleFormErrors(e.target, errors);
    } else {
        clearFormErrors(e.target);
        await logIn(email, password);
    }
});
