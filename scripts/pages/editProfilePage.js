import { updateProfileMedia } from '../api/profiles.js';
import { getUserObject } from '../utils.js';

const form = document.getElementById('edit-profile-form');
const banner = document.getElementById('banner');
const avatar = document.getElementById('avatar');

const user = getUserObject();
if (user.banner) banner.value = user.banner;
if (user.avatar) avatar.value = user.avatar;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    user.avatar = data.avatar;
    user.banner = data.banner;
    localStorage.setItem('user', JSON.stringify(user));
    updateProfileMedia(data);
});
