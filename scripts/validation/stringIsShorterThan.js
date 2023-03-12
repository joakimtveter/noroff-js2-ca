/**
 *  Validates the minimum length of a string.
 * @param {string} string - The string to check for length.
 * @param {number} [maxLength] - The maximum number of characters, defaults to 255.
 * @returns {boolean} - Whether or not the string has less the maximum amount characters.
 */
function stringIsShorterThan(string, maxLength = 255) {
    if (string === '') return true;
    if (string && string.length <= maxLength) return true;
    return false;
}

export { stringIsShorterThan };
