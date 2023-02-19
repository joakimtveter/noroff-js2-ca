import { get, post, BASE_URL } from './client.js';
import { getAccessToken } from '../utils/storage.js';

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
 * Creates API url and gets the posts from API
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

async function createPost(data) {
    console.log('create post:', data);
}

async function getPostsFromFollowedProfiles() {
    console.log('get posts from followed profiles');
}

async function updatePost(id, data) {
    console.log('update post:', id, data);
}

/**
 * Deletes a single post
 * @param {number} id - Id of post to delete
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
    } catch (error) {
        console.error(error);
        showToast(error, 'error');
    }
}

async function getPostById(id) {
    console.log('get post by id:', id);
}

async function addReaction(id, symbol) {
    console.log('add reaction:', id, symbol);
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

async function addComment(id, data) {
    console.log('add comment:', id, data);
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
