import { createHtmlElement } from '../render/createHtmlElement.js';
import { clearFormErrors } from '../validation.js';

/**
 * Adds errors to the form fields to indicate failed validation
 * @param {HTMLElement} form - The form to add errors to
 * @param {object[]} errors - The errors to add to the form
 */

function handleFormErrors(form, errors) {
    clearFormErrors(form);
    const errorFields = [...new Set(errors.map((error) => error.field))];
    for (let i = 0; i < form.length; i++) {
        if (errorFields.includes(form[i].id)) {
            form[i].classList.add('error');
            const errorText = errors
                .filter((error) => {
                    if (error.field === form[i].id) return true;
                })
                .map((error) => error.message);
            errorText.reverse().forEach((error) => {
                const element = createHtmlElement('p', 'error-text', error);
                form[i].insertAdjacentElement('afterend', element);
            });
        }
    }
}
export { handleFormErrors };
