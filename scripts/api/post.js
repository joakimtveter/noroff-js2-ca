import { BASE_URL } from '../client.js';
import { showToast, getAccessToken } from '../utils.js';

/**
 * Generic API post function
 * @param {string} endpoint - API endpoint to post to with leading slash
 * @param {object} [requestBody] - Post request body
 * @returns {Promise<void>} - Returns nothing. Throws error on failure.
 * @example post('/posts/1234/comment', { "body": "This is my comment","replyToId": null})
 */
async function post(endpoint, requestBody = null) {
    const token = getAccessToken();
    let header;
    if (requestBody) {
        header = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
        };
    } else {
        header = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    }
    try {
        const response = await fetch(`${BASE_URL + endpoint}`, header);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(`${error.statusCode} ${error.status} - ${error.errors[0].message}`);
        }
    } catch (error) {
        console.error(error);
        showToast(error, 'error');
    }
}

export { post };
