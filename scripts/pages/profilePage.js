import { getValueFromURLParameter } from '../utils/urlUtils.js';
import { isLoggedIn, getUserObject } from '../utils/storage.js';
import { getProfileByName, followProfile, unfollowProfile } from '../api/profiles.js';
import { getPostsByProfileName } from '../api/posts.js';
import { renderProfileCards } from '../render/profileCards.js';
import { renderPosts } from '../render/posts.js';

// Redirect to login page if not logged in
if (!isLoggedIn()) window.location.pathname = 'login.html';

// Get username from URL parameter or logged in user
let username = getValueFromURLParameter('name');
const currentUser = getUserObject().name;
if (!username) username = currentUser;
const isOwnProfile = username === currentUser ? true : false;

async function renderProfile(username) {
    try {
        const profile = await getProfileByName(username, { followers: true, following: true, posts: true });
        const { name, avatar, banner, followers, following, _count } = profile;
        const posts = await getPostsByProfileName(username, { author: true });
        const followerContainer = document.getElementById('followers-container');
        const followingContainer = document.getElementById('following-container');

        let isFollowing = followers.map((profile) => profile.name).includes(currentUser);
        console.log('isFollowing: ', isFollowing);
        // let isFollowing = false;
        if (isOwnProfile) {
            document.getElementById('edit-profile-button').hidden = false;
        } else {
            const followButton = document.getElementById('profile-follow-button');
            followButton.innerText = isFollowing ? 'Unfollow' : 'Follow';
            followButton.hidden = false;
            followButton.addEventListener('click', async () => {
                if (isFollowing) {
                    await unfollowProfile(username);
                    isFollowing = false;
                    followButton.innerText = 'Follow';
                } else {
                    await followProfile(username);
                    isFollowing = true;
                    followButton.innerText = 'Unfollow';
                }
                window.location.reload();
            });
        }

        document.getElementById('profile-name').innerText = `@${name}`;
        document.getElementById('profile-banner').src = banner;
        document.getElementById('profile-avatar').src = avatar ? avatar : '/images/no-avatar.png';
        document.getElementById('follower-count').innerText = _count.followers;
        document.getElementById('following-count').innerText = _count.following;
        document.getElementById('post-count').innerText = _count.posts;
        if (followers) renderProfileCards(followerContainer, followers);
        if (following) renderProfileCards(followingContainer, following);
        if (posts.length > 0) {
            renderPosts(document.getElementById('posts-container'), posts, [name]);
        } else {
            document.getElementById('posts-container').innerHTML = '<p>No posts</p>';
        }
    } catch (error) {
        console.error(error);
    }
}

renderProfile(username);
