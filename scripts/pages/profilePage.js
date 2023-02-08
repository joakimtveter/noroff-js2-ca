import { getValueFromURLParameter } from '../utils/urlUtils.js';
import { isLoggedIn, getLoggedInUserObject, getProfileByName, getPostsByProfileName } from '../client.js';
import { renderProfileCards, activateProfileImageClicks } from '../profile.js';

// Redirect to login page if not logged in
if (!isLoggedIn()) window.location.pathname = 'login.html';

// Get username from URL parameter or logged in user
let username = getValueFromURLParameter('name');
if (!username) username = getLoggedInUserObject().name;

async function renderProfile(username) {
    try {
        const profile = await getProfileByName(username, { followers: true, following: true, posts: true });
        const { name, avatar, banner, followers, following, _count } = profile;
        const posts = await getPostsByProfileName(username, {});
        console.log(posts);

        document.getElementById('profile-name').innerText = `@${name}`;
        document.getElementById('profile-banner').src = banner;
        document.getElementById('profile-avatar').src = avatar ? avatar : '/images/no-avatar.png';
        document.getElementById('follower-count').innerText = _count.followers;
        document.getElementById('following-count').innerText = _count.following;
        document.getElementById('post-count').innerText = _count.posts;
        const followerContainer = document.getElementById('followers-container');
        const followingContainer = document.getElementById('following-container');
        if (followers) renderProfileCards(followerContainer, followers);
        if (following) renderProfileCards(followingContainer, following);
        activateProfileImageClicks();
    } catch (error) {
        console.error(error);
    }
}

renderProfile(username);
