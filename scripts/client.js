import { showToast } from './utils/toast.js';

const baseUrl = 'https://api.noroff.dev/api/v1/social';
let loggedInUser;

function setLoggedInUser() {
    loggedInUser = JSON.parse(localStorage.getItem('user'));
}

function getAccessToken() {
    if (!loggedInUser) {
        setLoggedInUser();
    }
    return loggedInUser?.accessToken;
}

/**
 * Function to check if user is logged in.
 * @returns {boolean} true if user is logged in, false if not
 */
function isLoggedIn() {
    return !!getAccessToken();
}

/**
 * Logs in user and sets userobjet in localStorage
 * @param {string} email
 * @param {string} password
 * @returns {Promise<void>} Sets user in localStorage and redirects to index.html
 */
async function logIn(email, password) {
    try {
        const response = await fetch(baseUrl + '/auth/login', {
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
        const user = JSON.stringify(data);
        console.info(data?.name + ' is logged in');
        localStorage.setItem('user', user);
        window.location.pathname = 'index.html';
    } catch (error) {
        console.error(error);
        showToast('error', error);
    }
}

/**
 * Registers a new user and redirects to login.html
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {Promise<void>} Redirects to login.html
 */
async function register(name, email, password) {
    try {
        const response = await fetch(baseUrl + '/auth/register', {
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
        showToast('success', `${data.name} have successfully registered`);
        window.location.pathname = 'login.html';
    } catch (error) {
        console.error(error);
        showToast('error', error);
    }
}

// TODO: Add typedefs to return
/**
 * Gets posts from API
 * @param {string} [sort] - Sorts posts by either created or title (created/title)
 * @param {string} [sortOrder] - Order posts either ascending or descending (asc/desc)
 * @param {number} [limit] - Limits the number of posts returned
 * @param {number} [offset] - Offset the number of posts returned, not paged
 * @param {string} [tag] - Filter posts by tag
 * @param {boolean} [author] - Include author in response
 * @param {boolean} [reactions] - Include reactions in response
 * @param {boolean} [comments] - Include comments in response
 * @returns {Promise<object[]>} Redirects to login.html
 */
async function getPosts({
    sort = 'created',
    sortOrder = 'desc',
    limit = undefined,
    offset = undefined,
    tag = undefined,
    author = false,
    reactions = false,
    comments = false,
}) {
    const token = getAccessToken();
    let queryParams = '?';

    if (sort) {
        queryParams += `sort=${sort}`;
    }
    if (sortOrder) {
        queryParams += `&sortOrder=${sortOrder}`;
    }
    if (limit) {
        queryParams += `&limit=${limit}`;
    }
    if (offset) {
        queryParams += `&offset=${offset}`;
    }
    if (tag) {
        queryParams += `&_tag=${tag}`;
    }
    if (author) {
        queryParams += `&_author=true`;
    }
    if (reactions) {
        queryParams += `&_reactions=true`;
    }
    if (comments) {
        queryParams += `&comments=true`;
    }
    try {
        const response = await fetch(baseUrl + '/posts' + queryParams, {
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
        showToast('error', error);
    }
}

export { logIn, register, isLoggedIn, getAccessToken, getPosts };
