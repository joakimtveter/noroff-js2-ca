import { get } from '../../client.js';

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
 * @typedef {object} count
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
 * @property {count} _count - Object containing counts of followers, following and posts
 */

/**
 * Gets the profiles from API
 * @param {getProfilesOptions} options
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
    return get(`/profiles${queryParams}`);
}

export { getProfiles };
