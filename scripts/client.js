// Export API base url
const BASE_URL = 'https://api.noroff.dev/api/v1/social';
export { BASE_URL };

// Generic api call methods
export { get } from './api/get.js';
export { httpDelete } from './api/delete.js';
export { post } from './api/post.js';
export { put } from './api/put.js';

// Authentification API calls
export { register } from './api/auth/register.js';
export { logIn } from './api/auth/login.js';

// Posts API calls
export { getPosts } from './api/posts/getPosts.js';
export { getPostsByProfileName } from './api/posts/getPostsByProfileName.js';
export { createPost } from './api/posts/createPost.js';
export { deletePost } from './api/posts/deletePost.js';
export { getPostById } from './api/posts/getPostById.js';
export { getPostsFromFollowedProfiles } from './api/posts/getPostsFromFollowedProfiles.js';
export { addComment } from './api/posts/addComment.js';
export { addReaction } from './api/posts/addReaction.js';
export { updatePost } from './api/posts/updatePost.js';

// Profile API calls
export { getProfiles } from './api/profiles/getProfiles.js';
export { getProfileByName } from './api/profiles/getProfileByName.js';
export { updateProfileMedia } from './api/profiles/updateProfileMedia.js';
export { getFollowingList } from './api/profiles/getFollowingList.js';
export { getFollowingNameList } from './api/profiles/getFollowingNameList.js';
export { followProfile } from './api/profiles/followProfile.js';
export { unfollowProfile } from './api/profiles/unfollowProfile.js';
