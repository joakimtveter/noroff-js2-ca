import { isLoggedIn, getUserName, getValueFromURLParameter } from '../utils.js';
import { getPosts, getFollowingNameList } from '../client.js';
import { renderPosts } from '../render/posts.js';

// Redirect to login page if not logged in
if (!isLoggedIn()) window.location.pathname = '/login.html';

// Get tag from URL
const tag = getValueFromURLParameter('tag');
document.getElementById('title-modifier-tag').innerText = `#${tag}`;
document.title = `Discover #${tag} posts | MyPlace - Your place on the internetk`;

// Get posts and render them
async function fetchPosts() {
    const username = getUserName();
    const followingList = await getFollowingNameList(username);
    const posts = await getPosts({ tag: tag, author: true, reactions: true, comments: true });
    renderPosts(document.getElementById('post-feed'), posts, followingList, { comments: true, reactions: true });
}

fetchPosts();
