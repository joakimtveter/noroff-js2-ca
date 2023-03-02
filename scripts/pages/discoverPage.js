import { isLoggedIn, getUserName } from '../utils.js';
import { getPosts } from '../api/posts.js';
import { renderPosts } from '../render/posts.js';
import { getFollowingNameList } from '../api/profiles.js';

// Redirect to login page if not logged in
if (!isLoggedIn()) window.location.pathname = '/login.html';

// Get posts and render them
async function fetchPosts() {
    const username = getUserName();
    const followingList = await getFollowingNameList(username);
    const posts = await getPosts({ limit: 100, author: true, reactions: true, comments: true });
    renderPosts(document.getElementById('post-feed'), posts, followingList, { comments: true, reactions: true });
}

fetchPosts();
