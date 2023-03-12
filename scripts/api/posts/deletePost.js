import { httpDelete } from '../../client.js';

/**
 * Deletes a single post
 * @param {number | string} id - Id of post to delete
 * @returns {Promise<void>} - Returns nothing. Throws error on failure.
 */
async function deletePost(id) {
    await httpDelete(`/posts/${id}`);
}

export { deletePost };
