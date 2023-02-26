import { timeSince } from '../utils/days.js';
import { followProfile, unfollowProfile } from '../api/profiles.js';
import { addReaction, deletePost, addComment } from '../api/posts.js';
import { getUserName } from '../utils/storage.js';
import { createHtmlElement } from './utils.js';

function renderPosts(location, posts, followingList = [], options = {}) {
    posts.forEach((post) => {
        const { id, title, body, tags, _count, media, created, updated, author } = post;
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
        const postContentTitle = createHtmlElement('h2', 'post-content__title', title);
        const postContentBody = createHtmlElement('p', 'post-content__body', body);
        const postContentTags = createHtmlElement('div', 'post-content__tags');
        if (tags) {
            tags.forEach((tag) => {
                if (tag !== '') {
                    const tagElement = createHtmlElement('a', 'post-content__tag', `#${tag}`, {
                        href: `/posts/index.html?tag=${tag}`,
                    });
                    postContentTags.appendChild(tagElement);
                }
            });
        }
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
        const postComments = createHtmlElement('div', 'post-comments');
        const celebrateButton = createHtmlElement('button', 'post-footer__reaction-button', '👏', {
            ariaLabel: 'Celebrate post',
        });
        postReactionsButtons.appendChild(likeButton);
        postReactionsButtons.appendChild(loveButton);
        postReactionsButtons.appendChild(funnyButton);
        postReactionsButtons.appendChild(coolButton);
        postReactionsButtons.appendChild(sadButton);
        postReactionsButtons.appendChild(celebrateButton);

        // Add event listeners to reaction buttons
        likeButton.addEventListener('click', () => addReaction(id, '👍'));
        loveButton.addEventListener('click', () => addReaction(id, '❤'));
        funnyButton.addEventListener('click', () => addReaction(id, '🤣'));
        coolButton.addEventListener('click', () => addReaction(id, '😎'));
        sadButton.addEventListener('click', () => addReaction(id, '😢'));
        celebrateButton.addEventListener('click', () => addReaction(id, '👏'));

        const postReactions = createHtmlElement(
            'div',
            'post-footer__reactions',
            `${_count?.reactions || '0'} Reactions`
        );
        postFooter.appendChild(postReactionsButtons);
        postFooter.appendChild(postReactions);
        postElement.appendChild(postFooter);

        //Create post comments
        const postCommentsContainer = createHtmlElement('div', 'post-comments__container');
        const postCommentsHeader = createHtmlElement('p', 'post-comments__header', `${_count?.comments} Comments`);
        postCommentsContainer.appendChild(postCommentsHeader);

        if (post?.comments.length > 0) {
            post.comments.forEach((comment) => {
                const commentElement = document.createElement('div');
                const commentHeader = createHtmlElement(
                    'p',
                    'post-comment__header',
                    `${comment?.author?.name} - ${timeSince(new Date(comment?.created).getTime())}`
                );
                const commentBody = createHtmlElement('p', 'post-comment__body', comment?.body);

                commentElement.appendChild(commentHeader);
                commentElement.appendChild(commentBody);
                postCommentsContainer.appendChild(commentElement);
            });
        }
        const commentForm = createHtmlElement('form');
        commentForm.id = 'comment-form';
        const commentInput = createHtmlElement('input', null, null, {
            type: 'text',
            name: 'comment',
            placeholder: 'Add a comment...',
        });
        const commentSubmit = createHtmlElement('input', null, null, {
            type: 'submit',
            value: 'Submit comment',
        });
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
        postCommentsContainer.appendChild(commentForm);
        postElement.appendChild(postCommentsContainer);

        location.appendChild(postElement);
    });
}

export { renderPosts };
