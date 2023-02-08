import { renderPosts } from './post.js';

function renderProfileCards(location, profiles) {
    if (profiles.length === 0) {
        location.innerHTML = '<p>No profiles</p>';
        return;
    }
    let profileCards = '';
    profiles?.forEach((profile) => {
        const { name, avatar } = profile;
        profileCards += `
            <li class="profile-card">
            <picture class="profile-card__avatar-container" data-name="${name}">
                <img
                    class="profile-card__avatar"
                    src="${avatar ? avatar : '/images/no-avatar.png'}"
                    alt=""
                    height="50px"
                    width="50px"
                    style=" object-position: center; background-color: #eee;"
                    data-name="${name}"
                />
            </picture>
                <p class="profile-card__name"><a href="/profile.html?name=${name}">@${name}</a></p>
            </li>
        `;
    });
    location.innerHTML = profileCards;
}

function activateProfileImageClicks() {
    document.querySelectorAll('.profile-card__avatar-container').forEach((avatar) => {
        avatar.addEventListener('click', (event) => {
            console.log(event.target.dataset.name);
            const name = event.target.dataset.name;
            window.location.pathname = `/profile.html?name=${name}`;
        });
    });
}

export { activateProfileImageClicks, renderProfileCards };
