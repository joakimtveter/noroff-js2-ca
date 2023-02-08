import { timeSince } from './utils/days.js';

function renderPosts(location, posts) {
    let feed = '';
    posts.forEach((post) => {
        const { id, title, body, _count, media, created, updated, author } = post;
        const { name, avatar } = author;
        const isUpdated = created !== updated;
        let singlePost = `
            <li class="post">
                <div class="post-header">
                    <img
                        class="post-header__avatar"
                        src="${avatar}"
                        alt="Name profile picture"
                        height="100px"
                        width="100px"
                    />`;
        singlePost += `
                    <div class="post-header__meta">
                        <p class="post-header__author-name"><a href="/profile.html?name=${name}">@${name}</a></p>
                        <p class="post-header__created-date">
                            Created ${timeSince(new Date(created).getTime())} ${
            isUpdated ? '- <span>Edited</span>' : ''
        }</p>
                    </div>
                    <div class="post-header__actions">
                        <button class="post-header__follow-button" data-author="${name}">Follow</button>
                    </div>
                </div>
                <div class="post-content"> `;
        if (media) {
            singlePost += `
                    <picture class="post-content__image" data-postid="${id}">
                        <img
                            src="${media}"
                            alt=""
                        />
                    </picture>`;
        }
        singlePost += `
                <h2 class="post-content__title">${title}</h2>
                <p class="post-content__body">
                    ${body}
                </p>
                </div>
                <div class="post-footer">
                    <button class="post-footer__like-button" data-postid="${id}">Like</button>
                    <div class="post-footer__comments" data-postid="${id}">${_count.comments} comments</div>
                    <div class="post-footer__reactions" data-postid="${id}">${_count.reactions} reactions</div>
                </div>
            </li>`;
        feed += singlePost;
    });
    location.innerHTML = feed;
}

export { renderPosts };
