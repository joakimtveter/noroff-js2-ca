/**
 * Creates a HTML element with the given tag, class name and content.
 * @param {string} tag - HTML element tag name of the element
 * @param {string} [className] - Class name of the element
 * @param {string} [content] - Inner text of the element
 * @param {object} [atributtes] - Object with the element's attributes
 * @returns - Returns the created HTML element
 */
function createHtmlElement(tag, className = null, content = null, atributtes = {}) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.innerText = content;
    for (const key in atributtes) {
        element.setAttribute(key, atributtes[key]);
    }
    return element;
}

export { createHtmlElement };
