import { stringIsLongerThan, stringIsShorterThan } from '../validation.js';

/**
 * Validates the login form.
 * @param {string} title
 * @returns {object[]} - An array of error objects.
 */
function validatePostForm(title) {
    let errors = [];
    if (!stringIsLongerThan(title)) errors.push({ field: 'title', message: 'Title is required.' });
    if (!stringIsShorterThan(title, 280))
        errors.push({ field: 'title', message: 'Title must be shorer than 280 characters.' });

    return errors;
}

export { validatePostForm };
