import { timeSince } from '../utils/days.js';
import { followProfile, unfollowProfile } from '../api/profiles.js';
import { addReaction, deletePost } from '../api/posts.js';
import { getUserName } from '../utils/storage.js';

function renderPosts(location, posts, followingList) {
    posts.forEach((post) => {
        const { id, title, body, _count, media, created, updated, author } = post;
        const { name, avatar } = author;
        const isUpdated = created !== updated;
        const isFollowing = followingList.includes(name);
        const isCurrentUser = name === getUserName();

        //create elements
        const postElement = document.createElement('li');
        postElement.classList.add('post');
        const postHeader = document.createElement('div');
        postHeader.classList.add('post-header');
        const postHeaderAvatar = document.createElement('img');
        postHeaderAvatar.classList.add('post-header__avatar');
        postHeaderAvatar.src = avatar ?? '/images/no-avatar.png';
        postHeaderAvatar.alt = '';
        postHeaderAvatar.height = 100;
        postHeaderAvatar.width = 100;
        const postHeaderMeta = document.createElement('div');
        postHeaderMeta.classList.add('post-header__meta');
        const postHeaderAuthorName = document.createElement('p');
        postHeaderAuthorName.classList.add('post-header__author-name');
        const postHeaderAuthorNameLink = document.createElement('a');
        postHeaderAuthorNameLink.href = `/profile/index.html?name=${name}`;
        postHeaderAuthorNameLink.innerText = `@${name}`;
        const postHeaderCreatedDate = document.createElement('p');
        postHeaderCreatedDate.classList.add('post-header__created-date');
        postHeaderCreatedDate.innerText = `Created ${timeSince(new Date(created).getTime())}`;
        if (isUpdated) {
            const edited = document.createElement('span');
            edited.innerText = ' - Edited';
            edited.classList.add('edited');
            postHeaderCreatedDate.append(edited);
        }
        const postHeaderActions = document.createElement('div');
        postHeaderActions.classList.add('post-header__actions');
        if (isCurrentUser) {
            const postDeleteButton = document.createElement('button');
            postDeleteButton.classList.add('post-header__delete-button');
            postDeleteButton.innerText = 'Delete';
            postDeleteButton.addEventListener('click', () => deletePost(id));
            postHeaderActions.appendChild(postDeleteButton);
            const postEditButton = document.createElement('a');
            postEditButton.classList.add('post-header__edit-button');
            postEditButton.innerText = 'Edit';
            postEditButton.href = `/posts/edit.html?id=${id}`;
            postHeaderActions.appendChild(postEditButton);
        } else {
            const postHeaderFollowButton = document.createElement('button');
            postHeaderFollowButton.classList.add('post-header__follow-button');
            postHeaderFollowButton.innerText = isFollowing ? 'Unfollow' : 'Follow';
            postHeaderActions.appendChild(postHeaderFollowButton);

            postHeaderFollowButton.addEventListener('click', () => {
                if (isFollowing) {
                    unfollowProfile(name);
                    postHeaderFollowButton.innerText = 'Follow';
                } else {
                    followProfile(name);
                    postHeaderFollowButton.innerText = 'Unfollow';
                }
            });
        }
        const postContent = document.createElement('div');
        postContent.classList.add('post-content');
        const postContentPicture = document.createElement('picture');
        postContentPicture.classList.add('post-content__image');
        const postContentImage = document.createElement('img');
        postContentImage.src = media;
        const postContentTitle = document.createElement('h2');
        postContentTitle.classList.add('post-content__title');
        postContentTitle.innerText = title;
        const postContentBody = document.createElement('p');
        postContentBody.classList.add('post-content__body');
        postContentBody.innerText = body;
        const postFooter = document.createElement('div');
        postFooter.classList.add('post-footer');
        const postFooterCommentsButton = document.createElement('div');
        postFooterCommentsButton.classList.add('post-footer__comments');
        postFooterCommentsButton.innerText = `${_count?.comments || '0'} Comments`;
        const postReactions = document.createElement('div');
        postReactions.classList.add('post-footer__reactions');
        postReactions.innerText = `${_count?.reactions || '0'} Reactions`;
        const postReactionsButtons = document.createElement('div');
        postReactionsButtons.classList.add('post-footer__reaction-buttons');
        const likeButton = document.createElement('button');
        likeButton.innerText = '👍';
        likeButton.ariaLabel = 'Like post';
        const loveButton = document.createElement('button');
        loveButton.innerText = '❤';
        loveButton.ariaLabel = 'Love post';
        const funnyButton = document.createElement('button');
        funnyButton.innerText = '🤣';
        funnyButton.ariaLabel = 'Mark post as funny';
        const coolButton = document.createElement('button');
        coolButton.innerText = '😎';
        coolButton.ariaLabel = 'Mark post as cool';
        const sadButton = document.createElement('button');
        sadButton.innerText = '😢';
        sadButton.ariaLabel = 'Mark post as sad';
        const celebrateButton = document.createElement('button');
        celebrateButton.innerText = '👏';
        celebrateButton.ariaLabel = 'Celebrate post';

        //append elements
        postHeaderAuthorName.appendChild(postHeaderAuthorNameLink);
        postHeaderMeta.appendChild(postHeaderAuthorName);
        postHeaderMeta.appendChild(postHeaderCreatedDate);
        postHeader.appendChild(postHeaderAvatar);
        postHeader.appendChild(postHeaderMeta);
        postHeader.appendChild(postHeaderActions);
        postContent.appendChild(postContentPicture);
        postContentPicture.appendChild(postContentImage);
        postContent.appendChild(postContentTitle);
        postContent.appendChild(postContentBody);
        postReactionsButtons.appendChild(likeButton);
        postReactionsButtons.appendChild(loveButton);
        postReactionsButtons.appendChild(funnyButton);
        postReactionsButtons.appendChild(coolButton);
        postReactionsButtons.appendChild(sadButton);
        postReactionsButtons.appendChild(celebrateButton);
        postFooter.appendChild(postReactionsButtons);
        postFooter.appendChild(postFooterCommentsButton);
        postFooter.appendChild(postReactions);
        postElement.appendChild(postHeader);
        postElement.appendChild(postContent);
        postElement.appendChild(postFooter);

        likeButton.addEventListener('click', () => addReaction(id, '👍'));
        loveButton.addEventListener('click', () => addReaction(id, '❤'));
        funnyButton.addEventListener('click', () => addReaction(id, '🤣'));
        coolButton.addEventListener('click', () => addReaction(id, '😎'));
        sadButton.addEventListener('click', () => addReaction(id, '😢'));
        celebrateButton.addEventListener('click', () => addReaction(id, '👏'));

        location.appendChild(postElement);
    });
}

export { renderPosts };
