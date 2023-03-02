import { timeSince, getUserName } from '../utils.js';
import { followProfile, unfollowProfile } from '../api/profiles.js';
import { addReaction, deletePost, addComment } from '../api/posts.js';
import { createHtmlElement } from './createHtmlElement.js';
import { renderComments } from './comments.js';

function renderPosts(location, posts, followingList = [], options = {}) {
    posts.forEach((post) => {
        const { id, title, body, tags, _count, media, created, updated, author, comments } = post;
        const { name, avatar } = author;
        const isUpdated = created !== updated;
        const isFollowing = followingList.includes(name);
        const isCurrentUser = name === getUserName();

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
                isFollowing ? 'Unfollow' : 'Follow'
            );
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
        const loveButton = createHtmlElement('button', 'post-footer__reaction-button', '❤', { ariaLabel: 'Love post' });
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

        const postReactions = createHtmlElement(
            'div',
            'post-footer__reactions',
            `${_count?.reactions || '0'} Reactions`
        );
        postFooter.appendChild(postReactionsButtons);
        postFooter.appendChild(postReactions);
        postElement.appendChild(postFooter);

        // TODO: Fix so this works more than once
        // Add event listeners to reaction buttons
        likeButton.addEventListener('click', () => {
            addReaction(id, '👍');
            postReactions.innerText = `${parseInt(_count?.reactions) + 1} Reactions`;
        });
        loveButton.addEventListener('click', () => {
            addReaction(id, '❤');
            postReactions.innerText = `${parseInt(_count?.reactions) + 1} Reactions`;
        });
        funnyButton.addEventListener('click', () => {
            addReaction(id, '🤣');

            postReactions.innerText = `${parseInt(_count?.reactions) + 1} Reactions`;
        });
        coolButton.addEventListener('click', () => {
            addReaction(id, '😎');
            postReactions.innerText = `${parseInt(_count?.reactions) + 1} Reactions`;
        });
        sadButton.addEventListener('click', () => {
            addReaction(id, '😢');
            postReactions.innerText = `${parseInt(_count?.reactions) + 1} Reactions`;
        });
        celebrateButton.addEventListener('click', () => {
            addReaction(id, '👏');
            postReactions.innerText = `${parseInt(_count?.reactions) + 1} Reactions`;
        });

        //Create post comments
        const postCommentsContainer = createHtmlElement('div', 'post-comments__container');
        const postCommentsHeader = createHtmlElement('p', 'post-comments__header', `${_count?.comments} Comments`);
        postCommentsContainer.appendChild(postCommentsHeader);

        // TODO: Make render comments recurcive

        // const postCommentsList = createHtmlElement('div', 'post-comments');
        // renderComments(postCommentsList, comments, id);
        // postCommentsContainer.appendChild(postCommentsList);

        for (let i = 0; i < comments.length; i++) {
            const comment = comments[i];
            if (comment.replyToId) continue;
            const commentElement = createHtmlElement('div', 'post-comment');
            const commentHeader = createHtmlElement(
                'p',
                'post-comment__header',
                `${comment?.author?.name} - ${timeSince(new Date(comment?.created).getTime())}`
            );
            const commentBody = createHtmlElement('p', 'post-comment__body', comment?.body);
            commentElement.appendChild(commentHeader);
            commentElement.appendChild(commentBody);
            for (let j = 0; j < comments.length; j++) {
                const reply = comments[j];
                if (reply.replyToId === comment.id) {
                    const replyElement = createHtmlElement('div', 'post-comment');
                    const replyHeader = createHtmlElement(
                        'p',
                        'post-comment__header',
                        `${reply?.author?.name} - ${timeSince(new Date(reply?.created).getTime())}`
                    );
                    const replyBody = createHtmlElement('p', 'post-comment__body', reply?.body);
                    const replyButton = createHtmlElement('button', 'post-comment__reply-button', 'Reply');
                    replyElement.appendChild(replyHeader);
                    replyElement.appendChild(replyBody);
                    replyElement.appendChild(replyButton);
                    replyButton.addEventListener('click', () => (replyToInput = reply.id));
                    for (let k = 0; k < comments.length; k++) {
                        const reply2 = comments[k];
                        if (reply2.replyToId === reply.id) {
                            const replyElement2 = createHtmlElement('div', 'post-comment');
                            const replyHeader2 = createHtmlElement(
                                'p',
                                'post-comment__header',
                                `${reply2?.author?.name} - ${timeSince(new Date(reply2?.created).getTime())}`
                            );
                            const replyBody2 = createHtmlElement('p', 'post-comment__body', reply2?.body);
                            replyElement2.appendChild(replyHeader2);
                            replyElement2.appendChild(replyBody2);
                            replyElement.appendChild(replyElement2);
                        }
                    }
                    commentElement.appendChild(replyElement);
                }
            }
            postCommentsContainer.appendChild(commentElement);
        }

        const commentForm = createHtmlElement('form');
        commentForm.id = 'comment-form';
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
