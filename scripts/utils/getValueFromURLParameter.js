/**
 * Get the value of a parameter from the URL query string
 * @param {string} parameter Url parameter to get the value from
 * @returns {string} Value of the parameter
 */
function getValueFromURLParameter(parameter) {
    const urlParams = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    return urlParams[parameter];
}

export { getValueFromURLParameter };
