import { isLoggedIn } from '../utils/storage.js';
import { setFollowButtonState } from '../utils/post.js';
import { getPosts } from '../api/posts.js';
import { followProfile, unfollowProfile } from '../api/profiles.js';
import { renderPosts } from '../render/post.js';

// Redirect to login page if not logged in
if (!isLoggedIn()) window.location.pathname = '/login.html';

// Get posts and render them
const posts = await getPosts({ author: true });
// renderPosts(document.getElementById('post-feed'), posts);

// TODO: Delete console.log when done
console.log(posts);

setFollowButtonState();

// Enable follow/unfollow buttons
followButtons.forEach((button) => {
    button.addEventListener('click', async (event) => {
        const author = event.target.dataset.author;
        if (event.target.innerHTML === 'Follow') {
            await followProfile(author);
            event.target.innerHTML = 'Unfollow';
        } else {
            await unfollowProfile(author);
            event.target.innerHTML = 'Follow';
        }
    });
});
