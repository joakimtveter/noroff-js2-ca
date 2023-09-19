import { isLoggedIn, getValueFromURLParameter, redirect } from '../utils.js';
import { getPostById, updatePost, deletePost } from '../client.js';
import { validatePostForm, clearFormErrors, handleFormErrors } from '../validation.js';

// Redirect to login page if not logged in
if (!isLoggedIn()) window.location.pathname = '/login.html';
// Redirect to create post page if no id in url
const postId = getValueFromURLParameter('id');
if (!postId) window.location.pathname = '/posts/create.html';
document.getElementById('title-modifier-id').innerText = postId;

// Populate form with post data
const post = await getPostById(postId, { author: true, comments: true, reactions: true });

const editPostForm = document.getElementById('edit-post-form');
const postTitle = document.getElementById('title');
const postBody = document.getElementById('body');
const postTags = document.getElementById('tags');
const postMedia = document.getElementById('media');
if (post?.title) postTitle.value = post.title;
if (post?.body) postBody.value = post.body;
if (post?.tags.length > 0) postTags.value = post?.tags.join(', ');
if (post?.media) postMedia.value = post.media;

// Update post
editPostForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = postTitle.value.trim();
    const body = postBody.value.trim();
    const tags = postTags.value.split(',').map((tag) => tag.trim());
    const media = postMedia.value.trim();
    const errors = validatePostForm(title);
    if (errors.length > 0) {
        handleFormErrors(e.target, errors);
    } else {
        clearFormErrors(e.target);

        const requestBody = {
            title,
            body,
            tags,
            media,
        };
        updatePost(postId, requestBody);
        redirect(`/posts/single.html?id=${postId}`);
    }
});

// Delete post
const deletePostButton = document.getElementById('delete-post-button');
deletePostButton.addEventListener('click', async () => {
    await deletePost(postId);
    redirect('/profile/index.html');
});
