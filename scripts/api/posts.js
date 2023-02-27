import { get, BASE_URL } from './client.js';
import { getAccessToken } from '../utils/storage.js';
import { showToast } from '../utils/toast.js';

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
 * @typedef {object} limitedPostOptions
 * @property {boolean} [limitedPostOptions.author] - Include author in response
 * @property {boolean} [limitedPostOptions.reactions] - Include reactions in response
 * @property {boolean} [limitedPostOptions.comments] - Include comments in response
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
 * Gets the posts from API
 * @param {object} getPostsOptions
 * @returns {Promise<post[]>} - Returns an array of posts
 */
async function getPosts(options = {}) {
    let queryParams = '';
    const parameters = [];

    if (options.sort) parameters.push(`sort=${options.sort}`);
    if (options.sortOrder) parameters.push(`sortOrder=${options.sortOrder}`);
    if (options.limit) parameters.push(`limit=${options.limit}`);
    if (options.offset) parameters.push(`offset=${options.offset}`);
    if (options.tag) parameters.push(`_tag=${options.tag}`);
    if (options.author) parameters.push(`_author=true`);
    if (options.reactions) parameters.push(`_reactions=true`);
    if (options.comments) parameters.push(`_comments=true`);

    if (parameters.length > 0) queryParams = '?' + parameters.join('&');
    return get(`${BASE_URL}/posts${queryParams}`);
}

/**
 * Gets the posts from a single profile
 * @param {string} name - Name of profile to get posts from
 * @param {getPostsOptions} options
 * @returns
 */
async function getPostsByProfileName(name, options = {}) {
    let queryParams = '';
    const parameters = [];

    if (options.sort) parameters.push(`sort=${options.sort}`);
    if (options.sortOrder) parameters.push(`sortOrder=${options.sortOrder}`);
    if (options.limit) parameters.push(`&limit=${options.limit}`);
    if (options.offset) parameters.push(`&offset=${options.offset}`);
    if (options.tag) parameters.push(`&_tag=${options.tag}`);
    if (options.author) parameters.push(`&_author=true`);
    if (options.reactions) parameters.push(`&_reactions=true`);
    if (options.comments) parameters.push(`&comments=true`);
    if (parameters.length > 0) queryParams = '?' + parameters.join('&');

    return await get(`${BASE_URL}/profiles/${name}/posts${queryParams}`);
}

/**
 * @typedef {object} postBody
 * @property {string} postBody.title - Post title
 * @property {string} postBody.[body] - Post body
 * @property {string[]} postBody.[tags] - Post tags
 * @property {string} postBody.[media] - URL to post media
 */

/**
 * Creates a new post
 * @param {object} postBody - Post Request body
 * @returns {Promise<void>} - Returns nothing. Throws error on failure.
 */
async function createPost(requestBody) {
    const token = getAccessToken();
    try {
        const response = await fetch(`${BASE_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
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
        showToast('error', error);
    }
}

/**
 * Gets the posts from followed profiles from API
 * @param {object} getPostsOptions
 * @returns {Promise<post[]>} - Returns an array of posts
 */
async function getPostsFromFollowedProfiles(options = {}) {
    let queryParams = '';
    const parameters = [];

    if (options.sort) parameters.push(`sort=${options.sort}`);
    if (options.sortOrder) parameters.push(`sortOrder=${options.sortOrder}`);
    if (options.limit) parameters.push(`limit=${options.limit}`);
    if (options.offset) parameters.push(`offset=${options.offset}`);
    if (options.tag) parameters.push(`_tag=${options.tag}`);
    if (options.author) parameters.push(`_author=true`);
    if (options.reactions) parameters.push(`_reactions=true`);
    if (options.comments) parameters.push(`_comments=true`);

    if (parameters.length > 0) queryParams = '?' + parameters.join('&');
    return get(`${BASE_URL}/posts/following${queryParams}`);
}

/**
 * Gets updates a single post
 * @param {number} id - Id of post to update
 * @param {object} postBody - Post Request body
 * @returns {Promise<void>} - Returns nothing. Throws error on failure.
 */
async function updatePost(id, requestBody) {
    const token = getAccessToken();

    try {
        const response = await fetch(`${BASE_URL}/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
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
        showToast('error', error);
    }
}

/**
 * Deletes a single post
 * @param {number | string} id - Id of post to delete
 * @returns {Promise<void>} - Returns nothing. Throws error on failure.
 */
async function deletePost(id) {
    const token = getAccessToken();
    try {
        const response = await fetch(`${BASE_URL}/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(`${error.statusCode} ${error.status} - ${error.errors[0].message}`);
        }
        const data = await response.json();
        showToast('Post deleted', 'info');
    } catch (error) {
        console.error(error);
        showToast(error, 'error');
    }
}

/**
 * Gets a single post by id
 * @param {number | string} id - Number or string of post id
 * @param {limitedPostOptions} [options]
 * @returns {Promise<post>} - Returns a single post
 */
async function getPostById(id, options = {}) {
    console.log('get post by id:', id, options);
    let queryParams = '';
    const parameters = [];

    if (options.author) parameters.push(`_author=true`);
    if (options.reactions) parameters.push(`_reactions=true`);
    if (options.comments) parameters.push(`_comments=true`);

    if (parameters.length > 0) queryParams = '?' + parameters.join('&');
    return get(`${BASE_URL}/posts/${id}${queryParams}`);
}

/**
 *  Adds a reaction to a post
 * @param {number | string} id - Id of post to add reaction to
 * @param {string} symbol - Symbol of reaction to add (e.g. '👍')
 * @returns {Promise<void>} - Returns nothing. Throws error on failure.
 */
async function addReaction(id, symbol) {
    const token = getAccessToken();
    try {
        const response = await fetch(`${BASE_URL}/posts/${id}/react/${symbol}`, {
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
    console.log('add comment:', id, requestBody);
    const token = getAccessToken();
    try {
        const response = await fetch(`${BASE_URL}/posts/${id}/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
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
        showToast('error', error);
    }
}

export {
    getPosts,
    deletePost,
    getPostsByProfileName,
    getPostById,
    addReaction,
    addComment,
    createPost,
    getPostsFromFollowedProfiles,
    updatePost,
};
