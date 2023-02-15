import { isLoggedIn } from '../utils/storage.js';
import { setFollowButtonState } from '../utils/post.js';
import { getPosts } from '../api/posts.js';
import { followProfile, unfollowProfile } from '../api/profiles.js';
import { renderPosts } from '../render/posts.js';
import { showToast } from '../utils/toast.js';

// Redirect to login page if not logged in
if (!isLoggedIn()) window.location.pathname = '/login.html';

// Get posts and render them

const posts = await getPosts({ limit: 15, author: true, reactions: true });
renderPosts(document.getElementById('post-feed'), posts);

// TODO: Delete console.log when done
console.log(posts);
