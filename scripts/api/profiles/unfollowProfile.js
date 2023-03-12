import { put } from '../../client.js';

/**
 * Unfollows a profile
 * @param {string} name - Usermame of profile to unfollow
 * @returns {Promise<void>}
 */
async function unfollowProfile(name) {
    await put(`/profiles/${name}/unfollow`);
}

export { unfollowProfile };
