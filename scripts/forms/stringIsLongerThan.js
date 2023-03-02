/**
 *  Validates the minimum length of a string.
 * @param {string} string - The string to check for length.
 * @param {number} [minLength] - The minimum number of characters, defaults to 0.
 * @returns {boolean} - Whether or not the string has above the minimum characters.
 */
function stringIsLongerThan(string, minLength = 0) {
    if (string && string.length >= minLength) {
        return true;
    }
    return false;
}

export { stringIsLongerThan };
