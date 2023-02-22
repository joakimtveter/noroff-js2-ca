import { getFollowingList } from '../api/profiles.js';
import { getUserObject } from './storage.js';

function setFollowButtonState() {
    const user = getUserObject();
    const followButtons = document.querySelectorAll('.post-header__follow-button');
    const followingList = getFollowingList(user?.name);
    if (!followButtons) return;
    if (!followingList) return;
    console.log(followingList);
    followButtons.forEach((button) => {
        const author = button.dataset.author;
        const isFollowing = followingList.find((profile) => profile.username === author);
        if (isFollowing) {
            button.innerHTML = 'Unfollow';
            button.dataset.following = true;
        } else {
            button.innerHTML = 'Follow';
            button.dataset.following = false;
        }
    });
}

export { setFollowButtonState };
