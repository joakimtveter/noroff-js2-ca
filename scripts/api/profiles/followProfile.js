import { put } from '../../client.js';

/**
 * Follows a profile
 * @param {string} name - Name of profile to follow
 * @returns {Promise<void>}
 */
async function followProfile(name) {
    put(`/profiles/${name}/follow`);
}

export { followProfile };
