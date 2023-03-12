/**
 * Loads the url provided, uses setTimeout to avoid issues with the browser
 * @param {string} path - The path to load. Do not include the domain, but provide leading slash
 * @param {number} [delay] - The delay in milliseconds
 * @returns {void}
 *
 * @example redirect('/posts/single.html?id=123', 500);
 */
function redirect(path, delay = 250) {
    setTimeout(() => {
        window.location.href = window.location.origin + path;
    }, delay);
}

export { redirect };
