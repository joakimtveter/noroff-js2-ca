import { register } from '../client.js';
import { isLoggedIn } from '../utils.js';
import { validateRegistrationForm, clearFormErrors, handleFormErrors } from '../validation.js';

// redirect to index.html if user is already logged in
if (isLoggedIn()) {
    window.location.pathname = 'index.html';
}

const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errors = validateRegistrationForm(email, password, name);
    if (errors.length > 0) {
        handleFormErrors(e.target, errors);
    } else {
        clearFormErrors(e.target);
        register(name, email, password);
    }
});
