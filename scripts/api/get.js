import { showToast, getAccessToken } from '../utils.js';
import { BASE_URL } from '../client.js';

/**
 * Generic function to get data from API, includes access token in header and error handeling.
 * @param {string} endpoint - API endpoint including query parameters and leadning slash
 * @returns {Promise<object[]>}
 */
async function get(endpoint) {
    const token = getAccessToken();
    try {
        const response = await fetch(`${BASE_URL + endpoint}`, {
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

export { get };
