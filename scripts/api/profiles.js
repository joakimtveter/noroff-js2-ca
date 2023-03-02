import { get, BASE_URL } from './client.js';
import { showToast, getAccessToken, getUserName } from '../utils.js';

/**
 * @typedef {object} getProfilesOptions
 * @property {string} [getProfilesOptions.order] - Sort by 'created' or unknown
 * @property {string} [getProfilesOptions.sortOrder] - Sort order 'asc' or 'desc'
 * @property {number} [getProfilesOptions.limit] - Limit results for pagination
 * @property {number} [getProfilesOptions.offset] - Offset results for pagination
 * @property {boolean} [getProfilesOptions.followers] - Include list of followers in response
 * @property {boolean} [getProfilesOptions.following] - Include list of profiles user is following in response
 * @property {boolean} [getProfilesOptions.posts] - Include list of posts in response
 */

/**
 * @typedef {object} _count
 * @property {number} posts - Number of posts
 * @property {number} followers - Number of followers
 * @property {number} following - Number of profiles user is following
 */

/**
 * @typedef {object} profile
 * @property {string} name - Username
 * @property {string} email - User email
 * @property {string} banner - URL to banner image
 * @property {string} avatar - URL to avatar image
 * @property {object} _count - Object containing counts of followers, following and posts
 */

/**
 * Gets the profiles from API
 * @param {object} getProfilesOptions
 * @returns {Promise<profile[]>}
 */
async function getProfiles(options = {}) {
    let queryParams = '';
    const parameters = [];

    if (options.sort) parameters.push(`sort=${sort}`);
    if (options.sortOrder) parameters.push(`sortOrder=${sortOrder}`);
    if (options.limit) parameters.push(`limit=${limit}`);
    if (options.offset) parameters.push(`offset=${offset}`);
    if (options.followers) parameters.push(`_followers=true`);
    if (options.following) parameters.push(`_following=true`);
    if (options.posts) parameters.push(`_posts=true`);

    if (options.length > 0) queryParams = '?' + parameters.join('&');
    return get(`${BASE_URL}/profiles${queryParams}`);
}

/**
 * @typedef {object} getSingleProfileOptions
 * @property {boolean} [getSingleProfileOptions.followers] - Sort by 'created' or unknown
 * @property {boolean} [getSingleProfileOptions.following] - Sort order 'asc' or 'desc'
 * @property {boolean} [getSingleProfileOptions.posts] - Limit results for pagination
 */

/**
 * Gets a single profile by name
 * @param {string} name - Name of profile to follow
 * @param {object} [getSingleProfileOptions] - Options for getting a single profile
 * @returns {Promise<profile>}
 */
async function getProfileByName(name, options = {}) {
    let queryParams = '';
    const parameters = [];
    if (options.followers) parameters.push('_followers=true');
    if (options.following) parameters.push(`_following=true`);
    if (options.posts) parameters.push(`_posts=true`);
    if (parameters.length > 0) queryParams = '?' + parameters.join('&');
    return await get(`${BASE_URL}/profiles/${name}${queryParams}`);
}

/**
 * @typedef {object} updateProfileData
 * @property {string} [updateProfileData.avatar] - URL to avatar image
 * @property {string} [updateProfileData.banner] - URL to banner image
 */

/**
 * Update the profile media
 * @param {string} name - Name of profile to update
 * @param {updateProfileData} data - Data to update profile with
 * @returns {Promise<void>} - No return value, but throws error if something goes wrong
 */
async function updateProfileMedia(requestBody) {
    const token = getAccessToken();
    const name = getUserName();
    try {
        const response = await fetch(`${BASE_URL}/profiles/${name}/media`, {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(`${error.statusCode} ${error.status} - ${error.errors[0].message}`);
        }
        const data = await response.json();
    } catch (error) {
        console.error(error);
        showToast(error, 'error');
    }
}

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
    const profile = await get(`${BASE_URL}/profiles/${name}?_following=true`);
    return profile?.following;
}

/**
 * Gets the name of followers of a profile
 * @param {string} name - Name of profile to get followers for
 * @returns {Promise<followers[]>}
 */
async function getFollowingNameList(name) {
    const profile = await get(`${BASE_URL}/profiles/${name}?_following=true`);
    return profile?.following.map((profile) => profile.name);
}

/**
 * Follows a profile
 * @param {string} name - Name of profile to follow
 * @returns {Promise<void>}
 */
async function followProfile(name) {
    const token = getAccessToken();
    try {
        const response = await fetch(`${BASE_URL}/profiles/${name}/follow`, {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(`${error.statusCode} ${error.status} - ${error.errors[0].message}`);
        }
        const data = await response.json();
    } catch (error) {
        console.error(error);
        showToast('error', error);
    }
}

/**
 * Unfollows a profile
 * @param {string} name - Name of profile to unfollow
 * @returns {Promise<void>}
 */
async function unfollowProfile(name) {
    const token = getAccessToken();
    try {
        const response = await fetch(`${BASE_URL}/profiles/${name}/unfollow`, {
            method: 'PUT',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(`${error.statusCode} ${error.status} - ${error.errors[0].message}`);
        }
        const data = await response.json();
    } catch (error) {
        console.error(error);
        showToast('error', error);
    }
}

export {
    getProfiles,
    getProfileByName,
    getFollowingList,
    getFollowingNameList,
    followProfile,
    unfollowProfile,
    updateProfileMedia,
};
