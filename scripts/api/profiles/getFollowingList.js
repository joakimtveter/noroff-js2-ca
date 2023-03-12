import { get } from '../../client.js';

/**
 * @typedef {object} followers
 * @property {string} followers.avatar - URL to avatar image
 * @property {string} followers.name - Username
 */

/**
 * Gets the followers of a profile
 * @param {string} name - Name of profile to get followers for
 * @returns {Promise<followers[]>}
 */
async function getFollowingList(name) {
    const profile = await get(`/profiles/${name}?_following=true`);
    return profile?.following;
}

export { getFollowingList };
