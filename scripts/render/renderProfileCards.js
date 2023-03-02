import { createHtmlElement } from './createHtmlElement.js';

/**
 * @typedef {object} followerProfile - A profile object.
 * @property {string} followerProfile.avatar - URL to avatar image
 * @property {string} followerProfile.name - Username
 */

/**
 * Renders profile cards to the DOM.
 * @param {HTMLElement} location - THe location to render the profile cards as an HTML element.
 * @param {followerProfile[]} profiles - The profiles to render as an array of profile objects.
 * @returns {void} - Returns nothing, but renders the profile cards to the DOM.
 */
function renderProfileCards(location, profiles) {
    if (profiles.length === 0) {
        location.innerHTML = '<p>No profiles</p>';
        return;
    }
    // let profileCards = '';
    profiles?.forEach((profile) => {
        const { name, avatar } = profile;

        const profileCard = createHtmlElement('li', 'profile-card');
        const pictureElement = createHtmlElement('picture', 'profile-card__avatar-container');
        const imageElement = createHtmlElement('img', 'profile-card__avatar', null, {
            src: avatar ? avatar : '/images/no-avatar.png',
            alt: '',
            height: '50px',
            width: '50px',
            style: 'object-position: center; background-color: #eee;',
        });
        const nameElement = createHtmlElement('p', 'profile-card__name');
        const linkElement = createHtmlElement('a', null, `@${name}`, {
            href: `/profile/index.html?name=${name}`,
        });
        pictureElement.appendChild(imageElement);
        nameElement.appendChild(linkElement);
        profileCard.appendChild(pictureElement);
        profileCard.appendChild(nameElement);

        // add event listener and append to location
        pictureElement.addEventListener('click', () => {
            window.location.href = `/profile/index.html?name=${name}`;
        });
        location.appendChild(profileCard);
    });
}

export { renderProfileCards };
