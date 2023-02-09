import { showToast } from './utils/toast.js';

const baseUrl = 'https://api.noroff.dev/api/v1/social';
let loggedInUser = getLoggedInUserObject();

/**
 * @typedef {object} followers
 * @property {string} followers.name - Profile name
 * @property {string} followers.avatar - Profile avatar URL
 */

/**
 * @typedef {object} count
 * @property {number} [count.posts] - Number of posts
 * @property {number} [count.followers] - Number of followers
 * @property {number} [count.following] - Number of following
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
 * @typedef {object} profile
 * @property {string} profile.name - Profile name
 * @property {string} profile.email - Profile email
 * @property {string} profile.banner - Profile banner URL
 * @property {string} profile.avatar - Profile avatar URL
 * @property {count} profile._count - Number of posts, followers and following
 */

/**
 * @typedef {object} getProfileOptions
 * @property {string} getProfileOptions.sort - Sort by 'created' or 'created'
 * @property {string} getProfileOptions.sortOrder - Sort order 'asc' or 'desc'
 * @property {number} getProfileOptions.limit - Limit for pagination
 * @property {number} getProfileOptions.offset - Offset for pagination
 * @property {boolean} getProfileOptions.followers = Embed profile followers in response
 * @property {boolean} getProfileOptions.following = Embed profiles following in response
 * @property {boolean} getProfileOptions.booleanposts - Embed posts in response
 */

/**
 * Gets user from localStorage and sets loggedInUser variable
 */
function getLoggedInUserObject() {
    return JSON.parse(localStorage.getItem('user'));
}

/**
 * Gets access token for logged in user
 * @returns {string} - Access token for logged in user
 */
function getAccessToken() {
    if (!loggedInUser) {
        loggedInUser = getLoggedInUserObject();
    }
    return loggedInUser?.accessToken;
}

/**
 * Function to check if user is logged in.
 * @returns {boolean} true if user is logged in, false if not
 */
function isLoggedIn() {
    return !!getAccessToken();
}

/**
 * Logs in user and sets userobjet in localStorage
 * @param {string} email
 * @param {string} password
 * @returns {Promise<void>}
 */
async function logIn(email, password) {
    try {
        const response = await fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(`${data.statusCode} ${data.status} - ${data.errors[0].message}`);
        }
        const data = await response.json();
        const user = JSON.stringify(data);
        console.info(data?.name + ' is logged in');
        localStorage.setItem('user', user);
        window.location.pathname = 'index.html';
    } catch (error) {
        console.error(error);
        showToast(error, 'error');
    }
}

/**
 * Registers a new user and redirects to login.html
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {Promise<void>}
 */
async function register(name, email, password) {
    try {
        const response = await fetch(`${baseUrl}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(`${error.statusCode} ${error.status} - ${error.errors[0].message}`);
        }
        const data = await response.json();
        showToast(`${data.name} have successfully registered`, 'success');
        setTimeout(() => {
            window.location.pathname = 'login.html';
        }, 2000);
    } catch (error) {
        console.error(error);
        showToast(error, 'error');
    }
}

/**
 * Generic function to get data from API
 * @param {string} [url] - API endpoint including query parameters
 * @returns {Promise<object[]>}
 */
async function get(url) {
    const token = getAccessToken();
    try {
        const response = await fetch(url, {
            method: 'GET',
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
        return data;
    } catch (error) {
        console.error(error);
        showToast(error, 'error');
    }
}

/**
 *
 * @param {string} endpoint - API endpoint (full url)
 * @param {object} requestBody - Request body
 * @returns
 */
// async function post(endpoint, requestBody) {
//     const token = getAccessToken();
// const response = await fetch(endpoint, {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(requestBody),
// });
// if (!response.ok) {
//     const error = await response.json();
//     throw new Error(`${error.statusCode} ${error.status} - ${error.errors[0].message}`);
// }
// const data = await response.json();
// return data;
// }

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

// TODO: Add typedefs to return
/**
 * Creates API url and gets the posts from API
 * @param {object} getPostsOptions
 * @returns {Promise<object[]>} - Redirects to login.html
 */
async function getPosts({
    sort = undefined,
    sortOrder = undefined,
    limit = undefined,
    offset = undefined,
    tag = undefined,
    author = false,
    reactions = false,
    comments = false,
}) {
    let queryParams = '';
    const options = [];

    if (sort) options.push(`sort=${sort}`);
    if (sortOrder) options.push(`sortOrder=${sortOrder}`);
    if (limit) options.push(`limit=${limit}`);
    if (offset) options.push(`offset=${offset}`);
    if (tag) options.push(`_tag=${tag}`);
    if (author) options.push(`_author=true`);
    if (reactions) options.push(`_reactions=true`);
    if (comments) options.push(`_comments=true`);

    if (options.length > 0) {
        queryParams = '?' + options.join('&');
    }
    return get(`${baseUrl}/posts?${queryParams}`);
}

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
// TODO: add typedef to return
/**
 * Gets the profiles from API
 * @param {object} getProfilesOptions
 * @returns {Promise<profile[]>}
 */
async function getProfiles({
    sort = undefined,
    sortOrder = undefined,
    limit = undefined,
    offset = undefined,
    followers = false,
    following = false,
    posts = false,
}) {
    let queryParams = '';
    const options = [];

    if (sort) options.push(`sort=${sort}`);
    if (sortOrder) options.push(`sortOrder=${sortOrder}`);
    if (limit) options.push(`limit=${limit}`);
    if (offset) options.push(`offset=${offset}`);
    if (followers) options.push(`_followers=true`);
    if (following) options.push(`_following=true`);
    if (posts) options.push(`_posts=true`);

    if (options.length > 0) {
        queryParams = '?' + options.join('&');
    }
    return get(`${baseUrl}/profiles${queryParams}`);
}

/**
 * Gets the users the logged in user is following
 * @returns {Promise<followers[]>}
 */
// async function getCurrentUserFollowing() {
//     if (!loggedInUser) {
//         setLoggedInUser();
//     }
//     const name = loggedInUser.name;
//     const response = await get(`${baseUrl}/profiles/${name}?following=true`);
//     return response.following;
// }

/**
 * Deletes a single post
 * @param {number} id - Id of post to delete
 * @returns {Promise<>}
 */
async function deleteSinglePost(id) {
    const token = getAccessToken();
    try {
        const response = await fetch(`${baseUrl}/posts/${id}`, {
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

/**
 * Gets a single profile by name
 * @param {string} name - Name of profile to follow
 * @param {object} [followers] - Options to include followers, following and posts
 * @param {object} [options] - Options to include followers, following and posts
 * @returns {Promise<>}
 */
async function getProfileByName(name, { followers = false, following = false, posts = false }) {
    let queryParams = '';
    const options = [];
    if (followers) options.push('_followers=true');
    if (following) options.push(`_following=true`);
    if (posts) options.push(`_posts=true`);
    if (options.length > 0) queryParams = '?' + options.join('&');
    return await get(`${baseUrl}/profiles/${name}${queryParams}`);
}

async function getPostsByProfileName(
    name,
    {
        sort = 'created',
        sortOrder = 'desc',
        limit = undefined,
        offset = undefined,
        tag = undefined,
        author = false,
        reactions = false,
        comments = false,
    }
) {
    let queryParams = '';
    const options = [];

    if (sort) options.push(`sort=${sort}`);
    if (sortOrder) options.push(`sortOrder=${sortOrder}`);
    if (limit) options.push(`&limit=${limit}`);
    if (offset) options.push(`&offset=${offset}`);
    if (tag) options.push(`&_tag=${tag}`);
    if (author) options.push(`&_author=true`);
    if (reactions) options.push(`&_reactions=true`);
    if (comments) options.push(`&comments=true`);
    if (options.length > 0) queryParams = '?' + options.join('&');

    return await get(`${baseUrl}/profiles/${name}/posts${queryParams}`);
}

/**
 * Follows a profile
 * @param {string} name - Name of profile to follow
 * @returns {Promise<void>}
 */
async function followProfile(name) {
    const token = getAccessToken();
    try {
        const response = await fetch(`${baseUrl}/profiles/${name}/follow`, {
            method: 'POST',
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
        showToast('error', error);
    }
}

/**
 * Unfollows a profile
 * @param {string} name - Name of profile to unfollow
 * @returns {Promise<void>}
 */
async function unfollowProfile(name) {
    const token = getAccessToken();
    try {
        const response = await fetch(`${baseUrl}/profiles/${name}/unfollow`, {
            method: 'POST',
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
        showToast('error', error);
    }
}

export {
    logIn,
    register,
    isLoggedIn,
    getAccessToken,
    getPosts,
    followProfile,
    unfollowProfile,
    getProfileByName,
    getLoggedInUserObject,
    getPostsByProfileName,
};
