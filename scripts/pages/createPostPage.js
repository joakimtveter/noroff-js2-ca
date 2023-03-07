import { createPost } from '../client.js';
import { redirect, isLoggedIn } from '../utils.js';

// Redirect to login page if not logged in
if (!isLoggedIn()) window.location.pathname = '/login.html';

const createPostForm = document.getElementById('post-form');
const postTitle = document.getElementById('title');
const postBody = document.getElementById('body');
const postTags = document.getElementById('tags');
const postMedia = document.getElementById('media');

createPostForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = postTitle.value.trim();
    const body = postBody.value.trim();
    const tags = postTags.value.split(',').map((tag) => tag.trim());
    const media = postMedia.value.trim();
    const requestBody = {
        title,
        body,
        tags,
        media,
    };
    await createPost(requestBody);
    redirect('/posts/index.html');
});
