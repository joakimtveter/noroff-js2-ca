import { isLoggedIn, getUserName } from '../utils/storage.js';
import { getPosts } from '../api/posts.js';
import { renderPosts } from '../render/posts.js';
import { getFollowingNameList } from '../api/profiles.js';

// Redirect to login page if not logged in
if (!isLoggedIn()) window.location.pathname = '/login.html';

// Get posts and render them
async function fetchPosts() {
    const username = getUserName();
    const followingList = await getFollowingNameList(username);
    const posts = await getPosts({ limit: 15, author: true, reactions: true });
    renderPosts(document.getElementById('post-feed'), posts, followingList);
    console.log(posts);
}

fetchPosts();
