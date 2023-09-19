import { post } from '../../client.js';

/**
 * @typedef {object} createPostBody
 * @property {string} createPostBody.title - Post title
 * @property {string} createPostBody.[body] - Post body
 * @property {string[]} createPostBody.[tags] - Post tags
 * @property {string} createPostBody.[media] - URL to post media
 */

/**
 * Creates a new post
 * @param {createPostBody} requestBody - Post Request body
 * @returns {Promise<void>} - Returns nothing. Throws error on failure.
 */
async function createPost(requestBody) {
    await post('/posts', requestBody);
}

export { createPost };
