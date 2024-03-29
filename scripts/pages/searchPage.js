import { getValueFromURLParameter, isLoggedIn, getUserName } from '../utils.js';
import { getPosts, getFollowingNameList } from '../client.js';
import { renderPosts } from '../render/posts.js';

// Redirect to login page if not logged in
if (!isLoggedIn()) window.location.pathname = '/login.html';

const spinner = document.getElementById('loading');
const searchTermHeading = document.getElementById('search-term');
const searchResultCount = document.getElementById('search-results-count');
const searchResultsContainer = document.getElementById('search-results');
const searchField = document.getElementById('search-input');
const searchTerm = getValueFromURLParameter('q') || '';
const username = getUserName();

const results = await getPosts({ author: true, comments: true, reactions: true });
const followingList = await getFollowingNameList(username);
const filteredPosts = results.filter((post) => {
    const searchTermLower = searchTerm.toLowerCase();
    const title = post?.title.toLowerCase();
    const author = post?.author.name.toLowerCase();
    const body = post?.body ? post?.body.toLowerCase() : '';
    const tags = post?.tags?.map((tag) => tag.toLowerCase());

    if (title.includes(searchTermLower)) return true;
    if (body.includes(searchTermLower)) return true;
    if (author.includes(searchTermLower)) return true;
    if (tags.includes(searchTermLower)) return true;
});

searchField.value = searchTerm;
searchTermHeading.innerText = searchTerm || 'All posts';
searchResultCount.innerText = filteredPosts.length;
document.title = `Search results for "${searchTerm || 'All posts'}" | MyPlace - Your place on the internet`;
spinner.classList.add('hide-element');
if (filteredPosts.length > 0) renderPosts(searchResultsContainer, filteredPosts, followingList);
