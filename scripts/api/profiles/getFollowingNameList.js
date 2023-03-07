import { get } from '../../client.js';

/**
 * Gets the name of followers of a profile
 * @param {string} name - Name of profile to get followers for
 * @returns {Promise<string[]>} - Array of usernames
 */
async function getFollowingNameList(name) {
    const profile = await get(`/profiles/${name}?_following=true`);
    return profile?.following.map((profile) => profile.name);
}

export { getFollowingNameList };
