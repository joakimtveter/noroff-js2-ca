import { isLoggedIn } from '../utils/storage.js';
import { getValueFromURLParameter } from '../utils/urlUtils.js';
import { getPostById, updatePost } from '../api/posts.js';

const domain = window.location.origin;
// Redirect to login page if not logged in
if (!isLoggedIn()) window.location.pathname = '/login.html';
// Redirect to create post page if no id in url
const postId = getValueFromURLParameter('id');
if (!postId) window.location.pathname = '/posts/create.html';

const post = await getPostById(postId, { author: true, comments: true, reactions: true });
console.log(post);
const editPostForm = document.getElementById('edit-post-form');
const postTitle = document.getElementById('title');
const postBody = document.getElementById('body');
const postTags = document.getElementById('tags');
const postMedia = document.getElementById('media');

if (post?.title) postTitle.value = post.title;
if (post?.body) postBody.value = post.body;
if (post?.tags.length > 0) postTags.value = post?.tags.join(', ');
if (post?.media) postMedia.value = post.media;

editPostForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = postTitle.value.trim();
    const body = postBody.value.trim();
    const tags = postTags.value
        .trim()
        .split(',')
        .map((tag) => tag.trim());
    const media = postMedia.value.trim();
    const requestBody = {
        title,
        body,
        tags,
        media,
    };
    console.log(requestBody);
    updatePost(postId, requestBody);
    let Url = new URL(domain + '/posts/post.html').searchParams.append('id', postId);
    let params = new URLSearchParams(Url);
    params.append('id', postId);
    let redirectUrl = domain + '/posts/single.html?' + params.toString();
    console.log(redirectUrl);
    window.location.href = redirectUrl;
});

// Get single post by id
// add value to form fields
// add event listener to form
// on submit, update post, redirect to post page
