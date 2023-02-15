function renderProfileCards(location, profiles) {
    if (profiles.length === 0) {
        location.innerHTML = '<p>No profiles</p>';
        return;
    }
    // let profileCards = '';
    profiles?.forEach((profile) => {
        const { name, avatar } = profile;

        // create elements
        const profileCard = document.createElement('li');
        profileCard.classList.add('profile-card');
        const pictureElement = document.createElement('picture');
        pictureElement.classList.add('profile-card__avatar-container');
        const imageElement = document.createElement('img');
        imageElement.classList.add('profile-card__avatar');
        imageElement.src = avatar ? avatar : '/images/no-avatar.png';
        imageElement.alt = '';
        imageElement.height = '50px';
        imageElement.width = '50px';
        imageElement.style.objectPosition = 'center';
        imageElement.style.backgroundColor = '#eee';
        const nameElement = document.createElement('p');
        nameElement.classList.add('profile-card__name');
        const linkElement = document.createElement('a');
        linkElement.href = `/profile/index.html?name=${name}`;
        linkElement.textContent = `@${name}`;
        // assemble the elements
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
