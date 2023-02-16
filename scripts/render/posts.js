import { timeSince } from '../utils/days.js';
import { getUserObject } from '../utils/storage.js';
import { getFollowingList } from '../api/profiles.js';

function renderPosts(location, posts) {
    const currentUser = getUserObject().name;
    const followingList = getFollowingList(currentUser).then((data) => data.map((profile) => profile.name));
    console.log('followingList: ', typeof followingList, followingList);
    posts.forEach((post) => {
        const { id, title, body, _count, media, created, updated, author } = post;
        const { name, avatar } = author;
        const isUpdated = created !== updated;
        const isFollowing = followingList.includes(name);
        console.log('isFollowing: ', isFollowing);

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
        postHeaderAuthorNameLink.textContent = `@${name}`;
        const postHeaderCreatedDate = document.createElement('p');
        postHeaderCreatedDate.classList.add('post-header__created-date');
        postHeaderCreatedDate.textContent = `Created ${timeSince(new Date(created).getTime())} ${
            isUpdated ? '- Edited' : ''
        }`;
        const postHeaderActions = document.createElement('div');
        postHeaderActions.classList.add('post-header__actions');
        const postHeaderFollowButton = document.createElement('button');
        postHeaderFollowButton.classList.add('post-header__follow-button');
        postHeaderFollowButton.textContent = isFollowing ? 'Unfollow' : 'Follow';
        postHeaderFollowButton.dataset.following = isFollowing ? true : false;
        const postContent = document.createElement('div');
        postContent.classList.add('post-content');
        const postContentImage = document.createElement('picture');
        postContentImage.classList.add('post-content__image');
        postContentImage.src = media;
        const postContentTitle = document.createElement('h2');
        postContentTitle.classList.add('post-content__title');
        postContentTitle.textContent = title;
        const postContentBody = document.createElement('p');
        postContentBody.classList.add('post-content__body');
        postContentBody.textContent = body;
        const postFooter = document.createElement('div');
        postFooter.classList.add('post-footer');
        const postFooterLikeButton = document.createElement('button');
        postFooterLikeButton.classList.add('post-footer__like-button');
        postFooterLikeButton.textContent = 'Like';
        const postFooterCommentsButton = document.createElement('div');
        postFooterCommentsButton.classList.add('post-footer__comments');
        postFooterCommentsButton.textContent = `${_count?.comments || '0'} Comments`;
        const postReactionsButton = document.createElement('div');
        postReactionsButton.classList.add('post-footer__reactions');
        postReactionsButton.textContent = `${_count?.reactions || '0'} Reactions`;

        //append elements
        postHeaderAuthorName.appendChild(postHeaderAuthorNameLink);
        postHeaderMeta.appendChild(postHeaderAuthorName);
        postHeaderMeta.appendChild(postHeaderCreatedDate);
        postHeaderActions.appendChild(postHeaderFollowButton);
        postHeader.appendChild(postHeaderAvatar);
        postHeader.appendChild(postHeaderMeta);
        postHeader.appendChild(postHeaderActions);
        postContent.appendChild(postContentImage);
        postContent.appendChild(postContentTitle);
        postContent.appendChild(postContentBody);
        postFooter.appendChild(postFooterLikeButton);
        postFooter.appendChild(postFooterCommentsButton);
        postFooter.appendChild(postReactionsButton);
        postElement.appendChild(postHeader);
        postElement.appendChild(postContent);
        postElement.appendChild(postFooter);

        postHeaderFollowButton.addEventListener('click', () => {
            console.log('follow button clicked');
        });

        location.appendChild(postElement);

        // let singlePost = `
        //     <li class="post">
        //         <div class="post-header">
        //             <img
        //                 class="post-header__avatar"
        //                 src="${avatar ?? '/images/no-avatar.png'}"
        //                 alt="Name profile picture"
        //                 height="100px"
        //                 width="100px"
        //             />`;
        // singlePost += `
        //             <div class="post-header__meta">
        //                 <p class="post-header__author-name"><a href="/profile/index.html?name=${name}">@${name}</a></p>
        //                 <p class="post-header__created-date">
        //                     Created ${timeSince(new Date(created).getTime())} ${
        //     isUpdated ? '- <span class="edited">Edited</span>' : ''
        // }</p>
        //             </div>
        //             <div class="post-header__actions">
        //                 <button class="post-header__follow-button" data-author="${name ?? 'No name'}">Follow</button>
        //             </div>
        //         </div>
        //         <div class="post-content"> `;
        // if (media) {
        //     singlePost += `
        //             <picture class="post-content__image" data-postid="${id}">
        //                 <img
        //                     src="${media}"
        //                     alt=""
        //                 />
        //             </picture>`;
        // }
        // singlePost += `
        //         <h2 class="post-content__title">${title}</h2>
        //         <p class="post-content__body">
        //             ${body}
        //         </p>
        //         </div>
        //         <div class="post-footer">
        //             <button class="post-footer__like-button" data-postid="${id}">Like</button>
        //             <div class="post-footer__comments" data-postid="${id}">${_count.comments} comments</div>
        //             <div class="post-footer__reactions" data-postid="${id}">${_count.reactions} reactions</div>
        //         </div>
        //     </li>`;
        // feed += singlePost;
    });
}

export { renderPosts };
