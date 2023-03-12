import {
    isValidEmail,
    stringIsLongerThan,
    stringIsShorterThan,
    isNoroffEmail,
    isValidUsername,
} from '../validation.js';

/**
 * Validates the login form.
 * @param {string} email - A Noroff email address.
 * @param {string} password
 * @param {string} name -Username
 * @returns {object[]} - An array of error objects.
 */
function validateRegistrationForm(email, password, name) {
    let errors = [];
    if (!stringIsLongerThan(name)) errors.push({ field: 'name', message: 'Name is a required field.' });
    if (!stringIsShorterThan(name, 20))
        errors.push({ field: 'name', message: 'Name must be shorer than 20 characters.' });
    if (!isValidUsername(name))
        errors.push({ field: 'name', message: 'Name may only contain letters, numbers and underscores.' });
    if (!stringIsLongerThan(email)) errors.push({ field: 'email', message: 'Email is a required field.' });
    if (email && !isValidEmail(email) && !isNoroffEmail(email))
        errors.push({ field: 'email', message: 'Email is not a valid Noroff Email.' });
    if (!stringIsLongerThan(password)) errors.push({ field: 'password', message: 'Password is a required field.' });
    if (password && !stringIsLongerThan(password, 8))
        errors.push({ field: 'password', message: 'Password must be longer than 8 characters.' });

    return errors;
}

export { validateRegistrationForm };
