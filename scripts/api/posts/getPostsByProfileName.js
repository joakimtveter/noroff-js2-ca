import { get } from '../../client.js';

/**
 * @typedef {object} getPostsOptions
 * @property {string} [getPostsOptions.sort] - Sort by 'created' or 'created'
 * @property {string} [getPostsOptions.sortOrder] - Sort order 'asc' or 'desc'
 * @property {number} [getPostsOptions.limit] - Limit for pagination
 * @property {number} [getPostsOptions.offset] - Offset for pagination
 * @property {string} [getPostsOptions.tag] - Filter posts by tag
 * @property {boolean} [getPostsOptions.author] - Include author in response
 * @property {boolean} [getPostsOptions.reactions] - Include reactions in response
 * @property {boolean} [getPostsOptions.comments] - Include comments in response
 */

/**
 * @typedef {object} post
 * @property {number} post.id - Post ID
 * @property {string} post.title - Post title
 * @property {string} post.body - Post body
 * @property {string[]} post.tag - Post tags
 * @property {string} post.media - URL to post media
 * @property {string} post.created - Post created date
 * @property {string} post.updated - Post updated date
 */

/**
 * Gets the posts from a single profile
 * @param {string} profileName - Name of profile to get posts from
 * @param {getPostsOptions} options
 * @returns {Promise<post[]>}
 */
async function getPostsByProfileName(profileName, options = {}) {
    let queryParams = '';
    const parameters = [];

    if (options.sort) parameters.push(`sort=${options.sort}`);
    if (options.sortOrder) parameters.push(`sortOrder=${options.sortOrder}`);
    if (options.limit) parameters.push(`&limit=${options.limit}`);
    if (options.offset) parameters.push(`&offset=${options.offset}`);
    if (options.tag) parameters.push(`&_tag=${options.tag}`);
    if (options.author) parameters.push(`_author=true`);
    if (options.reactions) parameters.push(`_reactions=true`);
    if (options.comments) parameters.push(`_comments=true`);
    if (parameters.length > 0) queryParams = '?' + parameters.join('&');

    return await get(`/profiles/${profileName}/posts${queryParams}`);
}

export { getPostsByProfileName };
