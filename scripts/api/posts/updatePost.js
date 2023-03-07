import { put } from '../../client.js';

/**
 * @typedef {object} postBody
 * @property {string} postBody.title - Post title
 * @property {string} postBody.[body] - Post body
 * @property {string[]} postBody.[tags] - Post tags
 * @property {string} postBody.[media] - URL to post media
 */

/**
 * Gets updates a single post
 * @param {string | number} id - Id of post to update
 * @param {postBody} requestBody - Post Request body
 * @returns {Promise<void>} - Returns nothing. Throws error on failure.
 */
async function updatePost(id, requestBody) {
    await put(`/posts/${id}`, requestBody);
}

export { updatePost };
