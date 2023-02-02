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

/**
 * Set a parameter and value in the URL query string
 * @param {string} parameter
 * @param {string} value
 * @returns {void} Sets the value of a parameter in the URL query string
 */
function setUrlParameterWithoutReload(parameter = '', value = '') {
    const currentPath = window.location.pathname;
    if (parameter.length > 0 && value.length > 0) {
        window.history.pushState({}, '', `${currentPath}?${parameter}=${value}`);
    } else {
        window.history.pushState({}, '', currentPath);
    }
}
