/**
 * Get the value of a parameter from the URL query string
 * @param {string} parameter Url parameter to get the value from
 * @returns {string} Value of the parameter
 */
function getValueFromURLParameter(parameter) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameter);
}

export { getValueFromURLParameter };
