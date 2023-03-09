import { isLoggedIn, getUserName, getValueFromURLParameter } from '../utils.js';
import { getPostsFromFollowedProfiles, getFollowingNameList } from '../client.js';
import { renderPosts } from '../render/posts.js';

// Redirect to login page if not logged in
if (!isLoggedIn()) window.location.pathname = '/login.html';

const spinner = document.getElementById('loading');
const postFeed = document.getElementById('post-feed');
let posts = [];
let filteredPosts = [];
let followingList = [];
let hasImageFilter = false;
let hasTagsFilter = false;

function initPostFilters() {
    setHasImageFilter();
    setHasTagsFilter();
}

function setHasImageFilter() {
    const value = getValueFromURLParameter('hasImage');
    console.log('value: ', typeof value, value);
    if (value === 'true') {
        hasImageFilter = true;
    } else {
        hasImageFilter = false;
    }
    document.getElementById('hasImage').checked = hasImageFilter;
    console.log(hasImageFilter);
}

function setHasTagsFilter() {
    const value = getValueFromURLParameter('hasTags');
    console.log('value: ', typeof value, value);
    if (value === 'true') {
        hasTagsFilter = true;
        document.getElementById('hasTags').checked = true;
    } else {
        hasTagsFilter = false;
    }
    console.log(hasTagsFilter);
}

initPostFilters();

// Get posts and render them
async function fetchPosts() {
    const username = getUserName();
    followingList = await getFollowingNameList(username);
    posts = await getPostsFromFollowedProfiles({
        limit: 100,
        author: true,
        reactions: true,
        comments: true,
    });
    filteredPosts = posts
        .filter((post) => {
            if (!hasImageFilter) return true;
            if (post.media) return true;
        })
        .filter((post) => {
            if (!hasTagsFilter) return true;
            if (post.tags.length > 0) return true;
        });
    renderPosts(postFeed, filteredPosts, followingList, {
        comments: true,
        reactions: true,
    });
    spinner.classList.add('hide-element');
}

fetchPosts();

const feedFilters = document.getElementById('feed-filters');

feedFilters.addEventListener('change', (e) => {
    if (e.target.id === 'hasImage') {
        hasImageFilter = e.target.checked;
    }
    if (e.target.id === 'hasTags') {
        hasTagsFilter = e.target.checked;
    }
    postFeed.innerText = '';

    filteredPosts = posts
        .filter((post) => {
            if (!hasImageFilter) return true;
            if (post.media) return true;
        })
        .filter((post) => {
            if (!hasTagsFilter) return true;
            if (post.tags.length > 0) return true;
        });
    console.log(filteredPosts);
    renderPosts(postFeed, filteredPosts, followingList, {
        comments: true,
        reactions: true,
    });
});
