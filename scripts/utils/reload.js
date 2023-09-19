/**
 * Reloads the page, uses setTimeout to avoid issues with the browser
 * @param {number} [delay] - The delay in milliseconds
 * @returns {void}
 */
function reload(delay = 250) {
    setTimeout(() => {
        location.reload();
    }, delay);
}

export { reload };
