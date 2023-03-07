import { BASE_URL } from '../client.js';
import { showToast, getAccessToken } from '../utils.js';

/**
 * Generic delete funcion
 * @param {string} endpoint - Endpoint of  item to delete
 * @returns {Promise<void>} - Returns nothing. Throws error on failure.
 * @example httpDelete('/posts/123')
 */
async function httpDelete(endpoint) {
    const token = getAccessToken();
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'DELETE',
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
        showToast('Post deleted', 'info');
    } catch (error) {
        console.error(error);
        showToast(error, 'error');
    }
}

export { httpDelete };
