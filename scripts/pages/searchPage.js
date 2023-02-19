import { isLoggedIn } from '../utils/storage.js';
import { getValueFromURLParameter } from '../utils/urlUtils.js';
import { getPosts } from '../api/posts.js';
import { renderPosts } from '../render/posts.js';

// Redirect to login page if not logged in
if (!isLoggedIn()) window.location.pathname = '/login.html';

const searchTermHeading = document.getElementById('search-term');
const searchResultCount = document.getElementById('search-results-count');
const searchResultsContainer = document.getElementById('search-results');
const searchTerm = getValueFromURLParameter('q');

if (searchTerm) {
    const results = await getPosts({ author: true });
    const filteredPosts = results.filter((post) => {
        const searchTermLower = searchTerm.toLowerCase();
        const title = post?.title.toLowerCase();
        const author = post?.author.name.toLowerCase();
        const body = post?.body.toLowerCase();

        if (title.includes(searchTermLower)) return true;
        if (body.includes(searchTermLower)) return true;
        if (author.includes(searchTermLower)) return true;
    });
    // renderPosts(searchResultsContainer, filteredPosts);
    searchTermHeading.innerHTML = searchTerm;
    searchResultCount.innerHTML = filteredPosts.length;
}
