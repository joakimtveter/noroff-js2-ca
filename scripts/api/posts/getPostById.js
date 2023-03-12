import { get } from '../../client.js';

/**
 * @typedef {object} limitedPostOptions
 * @property {boolean} [limitedPostOptions.author] - Include author in response
 * @property {boolean} [limitedPostOptions.reactions] - Include reactions in response
 * @property {boolean} [limitedPostOptions.comments] - Include comments in response
 */

/**
 * Gets a single post by id
 * @param {number | string} id - Number or string of post id
 * @param {limitedPostOptions} [options]
 * @returns {Promise<post>} - Returns a single post
 */
async function getPostById(id, options = {}) {
    let queryParams = '';
    const parameters = [];

    if (options.author) parameters.push(`_author=true`);
    if (options.reactions) parameters.push(`_reactions=true`);
    if (options.comments) parameters.push(`_comments=true`);

    if (parameters.length > 0) queryParams = '?' + parameters.join('&');
    return get(`/posts/${id}${queryParams}`);
}

export { getPostById };
