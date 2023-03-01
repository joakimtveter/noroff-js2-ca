import { showToast } from '../utils.js';
import { getAccessToken } from '../utils/storage.js';

const BASE_URL = 'https://api.noroff.dev/api/v1/social';

/**
 * @typedef {object} followers
 * @property {string} followers.name - Profile name
 * @property {string} followers.avatar - Profile avatar URL
 */

/**
 * @typedef {object} count
 * @property {number} [count.posts] - Number of posts
 * @property {number} [count.followers] - Number of followers
 * @property {number} [count.following] - Number of following
 */

/**
 * Logs in user and sets userobjet in localStorage.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<void>} - Returns nothing, redirects to main feed on success or triggers a error toast on error.
 */
async function logIn(email, password) {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(`${data.statusCode} ${data.status} - ${data.errors[0].message}`);
        }
        const data = await response.json();
        const { accessToken, ...user } = data;
        localStorage.setItem('token', accessToken);
        localStorage.setItem('user', JSON.stringify(user));
        window.location.pathname = '/posts/index.html';
    } catch (error) {
        console.error(error);
        showToast(error, 'error');
    }
}

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

/**
 * Generic function to get data from API, includes access token in header and error handeling.
 * @param {string} url - API endpoint including query parameters
 * @returns {Promise<object[]>}
 */
async function get(url) {
    const token = getAccessToken();
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(`${error.statusCode} ${error.status} - ${error.errors[0].message}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        showToast(error, 'error');
    }
}

export { BASE_URL, logIn, register, get };
