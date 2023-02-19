import { isLoggedIn } from '../utils/storage.js';
import { getValueFromURLParameter } from '../utils/urlUtils.js';

// Redirect to login page if not logged in
if (!isLoggedIn()) window.location.pathname = '/login.html';

const postId = getValueFromURLParameter('id');

// Get single post by id
// add value to form fields
// add event listener to form
// on submit, update post, redirect to post page
