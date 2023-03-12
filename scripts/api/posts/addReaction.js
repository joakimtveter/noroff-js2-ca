import { put } from '../../client.js';

/**
 *  Adds a reaction to a post
 * @param {number | string} id - Id of post to add reaction to
 * @param {string} symbol - Symbol of reaction to add (e.g. '👍')
 * @returns {Promise<void>} - Returns nothing. Throws error on failure.
 */
async function addReaction(id, symbol) {
    await put(`/posts/${id}/react/${symbol}`);
}

export { addReaction };
