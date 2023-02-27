import { getValueFromURLParameter } from '../utils/urlUtils.js';
import { getPostById } from '../api/posts.js';
import { renderPosts } from '../render/posts.js';

const postId = getValueFromURLParameter('id');

async function init() {
    const singlePostContainer = document.getElementById('single-post');
    const post = await getPostById(postId, { author: true, comments: true, reactions: true });
    console.log(post);
    renderPosts(singlePostContainer, [post]);
}

init();
