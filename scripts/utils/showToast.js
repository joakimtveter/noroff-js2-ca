/**
 * Shows alert message on the top center of the screen
 * @param {string} message - Message to display in the alert
 * @param {string} [type] - Type of alert. Can be 'success', 'error', 'info' or 'warning'.
 * @param {number} [duration] - Duration of the alert in milliseconds. Default is 5000.
 *   @param {string} [ariaLive] - The aria-live attribute of the alert. Default is 'polite'.
 * @returns {void}
 */
function showToast(message, type = 'info', duration = 5000, ariaLive = 'polite') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.innerHTML = `<p>${message}</p>`;
    toast.classList.add('toast');
    toast.classList.add(type);
    toast.classList.add('active');
    toast.attributes['role'] = 'alert';
    toast.attributes['aria-live'] = ariaLive;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('active');
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, duration);
}

export { showToast };
