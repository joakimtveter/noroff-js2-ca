/**
 * Set mulitple query parameters and values in the URL query string without reloading the page
 * @param {object} [parameters] - object with key value pairs of parameters and values, no parameters will remove all parameters.
 * @returns {void} Sets the value of a parameter in the URL query string
 */
function setUrlParametersWithoutReload(parameters = {}) {
    const currentPath = window.location.pathname;
    if (Object.keys(parameters).length === 0) {
        window.history.pushState({}, '', currentPath);
    } else {
        let queryparams = [];
        Object.entries(parameters).forEach(([key, value]) => {
            queryparams.push(`${key}=${value}`);
        });

        window.history.pushState({}, '', currentPath + '?' + queryparams.join('&'));
    }
}

export { setUrlParametersWithoutReload };
