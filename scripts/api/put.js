import { BASE_URL } from '../client.js';
import { showToast, getAccessToken } from '../utils.js';

/**
 * Generic API put function
 * @param {string} endpoint - API endpoint to put to with leading slash
 * @param {object} [requestBody] - Put request body
 * @returns {Promise<void>} - Returns nothing. Throws error on failure.
 * @example put('/posts/1234/react/👍')
 */
async function put(endpoint, requestBody = null) {
    const token = getAccessToken();
    let header;
    if (requestBody) {
        header = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
        };
    } else {
        header = {
            method: 'PUT',
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

export { put };
