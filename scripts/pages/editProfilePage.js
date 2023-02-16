import { updateProfileMedia } from '../api/profiles.js';

const form = document.getElementById('edit-profile-form');
const banner = document.getElementById('banner');
const avatar = document.getElementById('avatar');

// Get the user's current profile data

// Set the form's input values to the user's current profile data

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log(data);

    updateProfileMedia(data);
});
