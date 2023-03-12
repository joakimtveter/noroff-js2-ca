import { get } from '../../client.js';

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
 * @typedef {object} getSingleProfileOptions
 * @property {boolean} [getSingleProfileOptions.followers] - Sort by 'created' or unknown
 * @property {boolean} [getSingleProfileOptions.following] - Sort order 'asc' or 'desc'
 * @property {boolean} [getSingleProfileOptions.posts] - Limit results for pagination
 */

/**
 * Gets a single profile by name
 * @param {string} name - Name of profile to fetch
 * @param {getSingleProfileOptions} [options] - Options for getting a single profile
 * @returns {Promise<profile[]>} - Returns a promise that resolves to a profile object
 */
async function getProfileByName(name, options = {}) {
    let queryParams = '';
    const parameters = [];
    if (options.followers) parameters.push('_followers=true');
    if (options.following) parameters.push(`_following=true`);
    if (options.posts) parameters.push(`_posts=true`);
    if (parameters.length > 0) queryParams = '?' + parameters.join('&');
    return await get(`/profiles/${name}${queryParams}`);
}

export { getProfileByName };
