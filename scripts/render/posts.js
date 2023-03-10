import { timeSince, getUserName } from '../utils.js';
import { followProfile, unfollowProfile, addReaction, deletePost, addComment } from '../client.js';
import { createHtmlElement } from './createHtmlElement.js';
// import { renderComments } from './comments.js';

function renderPosts(location, posts, followingList = [], options = {}) {
    const currentUser = getUserName();
    posts.forEach((post) => {
        const { id, title, body, tags, _count, media, created, updated, author, comments, reactions } = post;
        const { name, avatar } = author;
        const isUpdated = created !== updated;
        const isFollowing = followingList.includes(name);
        const isCurrentUser = name === currentUser;

        // Create post element
        const postElement = createHtmlElement('li', 'post');

        // Create post header
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
        const postHeaderCreatedDate = createHtmlElement(
            'p',
            'post-header__created-date',
            `Created ${timeSince(new Date(created).getTime())}`
        );
        if (isUpdated) {
            const edited = createHtmlElement('span', 'edited', ' - Edited');
            postHeaderCreatedDate.append(edited);
        }
        const postHeaderActions = createHtmlElement('div', 'post-header__actions');
        if (isCurrentUser) {
            const postDeleteButton = createHtmlElement('button', 'post-header__delete-button', 'Delete');
            const postEditButton = createHtmlElement('a', 'post-header__edit-button', 'Edit', {
                href: `/posts/edit.html?id=${id}`,
            });
            postHeaderActions.appendChild(postDeleteButton);
            postHeaderActions.appendChild(postEditButton);
            postDeleteButton.addEventListener('click', () => deletePost(id));
        } else {
            const postHeaderFollowButton = createHtmlElement(
                'button',
                'post-header__follow-button',
                isFollowing ? 'Unfollow' : 'Follow',
                { 'data-following': isFollowing ? true : false }
            );
            postHeaderActions.appendChild(postHeaderFollowButton);
            postHeaderFollowButton.addEventListener('click', (e) => {
                if (e.target.dataset.following === 'true') {
                    unfollowProfile(name);
                    postHeaderFollowButton.innerText = 'Follow';
                    postHeaderFollowButton.dataset.following = 'false';
                } else {
                    followProfile(name);
                    postHeaderFollowButton.innerText = 'Unfollow';
                    postHeaderFollowButton.dataset.following = 'true';
                }
            });
        }

        postHeaderAuthorName.appendChild(postHeaderAuthorNameLink);
        postHeaderMeta.appendChild(postHeaderAuthorName);
        postHeaderMeta.appendChild(postHeaderCreatedDate);
        postHeader.appendChild(postHeaderAvatar);
        postHeader.appendChild(postHeaderMeta);
        postHeader.appendChild(postHeaderActions);
        postElement.appendChild(postHeader);

        // Create post content
        const postContent = createHtmlElement('div', 'post-content');
        if (media) {
            const postContentPicture = createHtmlElement('picture', 'post-content__image');
            const postContentImage = createHtmlElement('img', null, null, { src: media });
            postContent.appendChild(postContentPicture);
            postContentPicture.appendChild(postContentImage);
        }
        const postContentTitle = createHtmlElement('h2', 'post-content__title');
        const postContentTitleLink = createHtmlElement('a', 'post-content__title-link', title, {
            href: `/posts/single.html?id=${id}`,
        });
        const postContentBody = createHtmlElement('p', 'post-content__body', body);
        const postContentTags = createHtmlElement('div', 'post-content__tags');
        if (tags) {
            tags.forEach((tag) => {
                if (tag !== '') {
                    const tagElement = createHtmlElement('a', 'post-content__tag', `#${tag}`, {
                        href: `/posts/tag.html?tag=${tag}`,
                    });
                    postContentTags.appendChild(tagElement);
                }
            });
        }
        postContentTitle.appendChild(postContentTitleLink);
        postContent.appendChild(postContentTitle);
        postContent.appendChild(postContentBody);
        postContent.appendChild(postContentTags);
        postElement.appendChild(postContent);

        // Create post footer
        const postFooter = createHtmlElement('div', 'post-footer');

        const postReactionsButtons = createHtmlElement('div', 'post-footer__reaction-buttons');
        const likeButton = createHtmlElement('button', 'post-footer__reaction-button', '👍', {
            ariaLabel: 'Like post',
        });
        const loveButton = createHtmlElement('button', 'post-footer__reaction-button', '❤', {
            ariaLabel: 'Love post',
            style: 'color: rebeccapurple;',
        });
        const funnyButton = createHtmlElement('button', 'post-footer__reaction-button', '🤣', {
            ariaLabel: 'Mark post as funny',
        });
        const coolButton = createHtmlElement('button', 'post-footer__reaction-button', '😎', {
            ariaLabel: 'Mark post as cool',
        });
        const sadButton = createHtmlElement('button', 'post-footer__reaction-button', '😢', {
            ariaLabel: 'Mark post as sad',
        });
        // const postComments = createHtmlElement('div', 'post-comments');
        const celebrateButton = createHtmlElement('button', 'post-footer__reaction-button', '👏', {
            ariaLabel: 'Celebrate post',
        });
        postReactionsButtons.appendChild(likeButton);
        postReactionsButtons.appendChild(loveButton);
        postReactionsButtons.appendChild(funnyButton);
        postReactionsButtons.appendChild(coolButton);
        postReactionsButtons.appendChild(sadButton);
        postReactionsButtons.appendChild(celebrateButton);

        const postReactions = createHtmlElement('div', 'post-footer__reactions', ` Reactions`);
        const postReactionsCount = createHtmlElement('span', 'post-footer__reactions-count', _count?.reactions || '0');
        postReactions.prepend(postReactionsCount);
        postFooter.appendChild(postReactionsButtons);
        postFooter.appendChild(postReactions);
        postElement.appendChild(postFooter);

        // Add event listeners to reaction buttons
        likeButton.addEventListener('click', () => {
            addReaction(id, '👍');
            postReactionsCount.innerText = parseInt(postReactionsCount.innerText) + 1;
        });
        loveButton.addEventListener('click', () => {
            addReaction(id, '❤');
            postReactionsCount.innerText = parseInt(postReactionsCount.innerText) + 1;
        });
        funnyButton.addEventListener('click', () => {
            addReaction(id, '🤣');

            postReactionsCount.innerText = parseInt(postReactionsCount.innerText) + 1;
        });
        coolButton.addEventListener('click', () => {
            addReaction(id, '😎');
            postReactionsCount.innerText = parseInt(postReactionsCount.innerText) + 1;
        });
        sadButton.addEventListener('click', () => {
            addReaction(id, '😢');
            postReactionsCount.innerText = parseInt(postReactionsCount.innerText) + 1;
        });
        celebrateButton.addEventListener('click', () => {
            addReaction(id, '👏');
            postReactionsCount.innerText = parseInt(postReactionsCount.innerText) + 1;
        });

        // Reactions list
        const postReactionsList = createHtmlElement('div', 'post-footer__reactions-list');
        reactions.forEach((reaction) => {
            const reactionElement = createHtmlElement('span', null, reaction.symbol + ' ' + reaction.count);
            postReactionsList.appendChild(reactionElement);
        });

        //Create post comments
        const postCommentsHeader = createHtmlElement('div', 'post-comments__header');
        const postCommentsContainer = createHtmlElement('div', 'post-comments__container');
        const postCommentsCount = createHtmlElement('p', 'post-comments__count', `${_count?.comments} Comments`);
        postCommentsHeader.appendChild(postCommentsCount);
        postCommentsHeader.appendChild(postReactionsList);
        postCommentsContainer.appendChild(postCommentsHeader);

        // TODO: Make render comments recurcive
        comments.forEach((comment) => {
            const commentElement = createHtmlElement('div', 'post-comment');
            const commentHeader = createHtmlElement(
                'p',
                'post-comment__header',
                `@${comment?.author?.name} - ${timeSince(new Date(comment?.created).getTime())}`
            );
            const commentBody = createHtmlElement('p', 'post-comment__body', comment?.body);
            commentElement.appendChild(commentHeader);
            commentElement.appendChild(commentBody);
            postCommentsContainer.appendChild(commentElement);
        });

        const commentForm = createHtmlElement('form', 'post-comment__form');
        commentForm.id = 'comment-form-' + id;
        const commentInput = createHtmlElement('input', null, null, {
            type: 'text',
            name: 'comment',
            placeholder: 'Add a comment...',
        });
        const replyToInput = createHtmlElement('input', null, null, {
            type: 'hidden',
            name: 'replyToId',
            value: null,
        });
        const commentSubmit = createHtmlElement('input', null, null, {
            type: 'submit',
            value: 'Submit comment',
        });
        commentForm.appendChild(commentInput);
        commentForm.appendChild(commentSubmit);
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const comment = { body: commentInput.value, replyToId: parseInt(replyToInput.value) || null };
            if (comment.body) {
                addComment(id, comment);
                commentInput.value = '';
            }
        });
        postCommentsContainer.appendChild(commentForm);
        postElement.appendChild(postCommentsContainer);

        location.appendChild(postElement);
    });
}

export { renderPosts };
