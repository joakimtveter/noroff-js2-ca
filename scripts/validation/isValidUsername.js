/**
 *  Validates the if the provided string is a usermame.
 * @param {string} username - The string to validate.
 * @returns {boolean} - Whether or not the username is valid.
 */
const isValidUsername = (username) => {
    // Prevent error on empty string
    if (username === '') return true;
    const regex = /^[\w]+$/;
    return regex.test(username);
};

export { isValidUsername };
