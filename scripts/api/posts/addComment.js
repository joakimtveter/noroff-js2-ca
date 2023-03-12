import { post } from '../../client.js';

/**
 * @typedef {object} postCommentBody
 * @property {string} postCommentBody.body - Text of comment
 * @property {string} [postCommentBody.replyToId] - Id of comment to reply to
 */

/**
 * Adds a comment to a post
 * @param {number | string} id - Id of post to add comment to
 * @param {postCommentBody} requestBody - Request body
 * @returns {Promise<void>} - Returns nothing. Throws error on failure.
 */
async function addComment(id, requestBody) {
    await post(`/posts/${id}/comment`, requestBody);
}

export { addComment };
