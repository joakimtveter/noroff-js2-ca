import { timeSince } from '../utils/days.js';
import { followProfile, unfollowProfile } from '../api/profiles.js';
import { addReaction, deletePost } from '../api/posts.js';
import { getUserName } from '../utils/storage.js';
// import { renderComments } from './comments.js';
// import { renderReactions } from './reactions.js';
import { createHtmlElement } from './utils.js';

function renderPosts(location, posts, followingList = [], options = {}) {
    posts.forEach((post) => {
        const { id, title, body, _count, media, created, updated, author } = post;
        const { name, avatar } = author;
        const isUpdated = created !== updated;
        const isFollowing = followingList.includes(name);
        const isCurrentUser = name === getUserName();
        const renderComments = options?.comments ? true : false;
        const renderReactions = options?.reactions ? true : false;

        //create elements
        const postElement = createHtmlElement('li', 'post');
        const postHeader = createHtmlElement('div', 'post-header');
        const postHeaderAvatar = createHtmlElement('img', 'post-header__avatar', null, {
            src: avatar ?? '/images/no-avatar.png',
            alt: '',
            height: 100,
            width: 100,
        });
        const postHeaderMeta = createHtmlElement('div', 'post-header__meta');
        const postHeaderAuthorName = createHtmlElement('p', 'post-header__author-name');
        const postHeaderAuthorNameLink = createHtmlElement('a', null, `@${name}`, {
            href: `/profile/index.html?name=${name}`,
        });
        const postHeaderCreatedDate = createHtmlElement('p', 'post-header__created-date');
        postHeaderCreatedDate.innerText = `Created ${timeSince(new Date(created).getTime())}`;
        if (isUpdated) {
            const edited = createHtmlElement('span', 'edited', ' - Edited');
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
        const postComments = document.createElement('div');
        postComments.classList.add('post-comments');
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

        if (renderComments) {
            const commentForm = document.createElement('form');
            commentForm.id = 'comment-form';
            const commentInput = document.createElement('input');
            commentInput.type = 'text';
            commentInput.name = 'comment';
            commentInput.placeholder = 'Add a comment...';
            const commentSubmit = document.createElement('input');
            commentSubmit.type = 'submit';
            commentSubmit.value = 'Submit comment';
            commentForm.appendChild(commentInput);
            commentForm.appendChild(commentSubmit);
            commentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const comment = commentInput.value;
                if (comment) {
                    addComment(id, comment);
                    commentInput.value = '';
                }
            });
            // const postComments = document.createElement('div');
            postComments.appendChild(commentForm);

            if (post?.comments.length > 0) {
                post.comments.forEach((comment) => {
                    const commentElement = document.createElement('div');
                    // commentElement.classList.add('post-comment');
                    // const commentHeader = document.createElement('div');
                    // commentHeader.classList.add('post-comment__header');
                    // const commentHeaderAvatar = document.createElement('img');
                    // commentHeaderAvatar.classList.add('post-comment__avatar');
                    // commentHeaderAvatar.src = comment.user.avatar;
                    // const commentHeaderMeta = document.createElement('div');
                    // commentHeaderMeta.classList.add('post-comment__meta');
                    // const commentHeaderAuthorName = document.createElement('p');
                    // commentHeaderAuthorName.classList.add('post-comment__author-name');
                    // const commentHeaderAuthorNameLink = document.createElement('a');
                    // commentHeaderAuthorNameLink.href = `/profile/index.html?name=${comment.user.name}`;
                    // commentHeaderAuthorNameLink.innerText = `@${comment.user.name}`;
                    // const commentHeaderCreatedDate = document.createElement('p');
                    // commentHeaderCreatedDate.classList.add('post-comment__created-date');
                    // commentHeaderCreatedDate.innerText = `Created ${timeSince(new Date(comment.created).getTime())}`;
                    // const commentBody = document.createElement('p');
                    // commentBody.classList.add('post-comment__body');
                    // commentBody.innerText = comment?.body;
                    commentElement.innerText = comment?.body;

                    //append elements
                    // commentHeaderAuthorName.appendChild(commentHeaderAuthorNameLink);
                    // commentHeaderMeta.appendChild(commentHeaderAuthorName);
                    // commentHeaderMeta.appendChild(commentHeaderCreatedDate);
                    // commentHeader.appendChild(commentHeaderAvatar);
                    // commentHeader.appendChild(commentHeaderMeta);
                    // commentElement.appendChild(commentHeader);
                    // commentElement.appendChild(commentBody);
                    postComments.appendChild(commentElement);
                });
            }
        }

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
        if (renderComments) postElement.appendChild(postComments);

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
