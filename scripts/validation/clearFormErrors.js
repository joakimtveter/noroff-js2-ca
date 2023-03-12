/**
 * Clears all validation errors from a form
 * @param {HTMLElement} form - The form to clear errors from
 * @returns {void}
 */
function clearFormErrors(form) {
    for (let i = 0; i < form.length; i++) {
        form[i].classList.remove('error');
    }
    const errorTexts = document.querySelectorAll('.error-text');
    errorTexts.forEach((errorText) => errorText.remove());
}

export { clearFormErrors };
