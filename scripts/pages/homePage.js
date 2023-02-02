import { isLoggedIn, getPosts } from '../client.js';

if (!isLoggedIn()) {
    window.location.pathname = 'login.html';
}

const posts = await getPosts({ limit: 10 });

console.log(posts);
