import { isLoggedIn, getPosts, followProfile, unfollowProfile } from '../client.js';
import { renderPosts } from '../post.js';
import { timeSince } from '../utils/days.js';

// redirect to login page if not logged in
if (!isLoggedIn()) {
    window.location.pathname = 'login.html';
}

// Get posts and render them
const posts = await getPosts({ limit: 10, author: true });
renderPosts(document.getElementById('post-feed'), posts);
console.log(posts);

// Set follow/unfollow button state
const followButtons = document.querySelectorAll('.post-header__follow-button');
// followButtons.forEach((button) => {
//     get list of current user followers
//     Compare if current post author is in the list of followers
//     if yes, set button text to unfollow
//     set data attribute following to true
//
// });

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
