import { showToast } from '../../utils.js';
import { BASE_URL } from '../../client.js';
/**
 * Registers a new user and redirects to login.html
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {Promise<void>} - Returns nothing, redirects to login.html on success or triggers a error toast on error.
 */
async function register(name, email, password) {
    try {
        const response = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(`${error.statusCode} ${error.status} - ${error.errors[0].message}`);
        }
        const data = await response.json();
        showToast(`${data.name} have successfully registered`, 'success');
        setTimeout(() => {
            window.location.pathname = 'login.html';
        }, 2000);
    } catch (error) {
        console.error(error);
        showToast(error, 'error');
    }
}

export { register };
