/**
 * Query selector to target a single or multiple elements from the DOM
 * @param {string} selector - The css element selector
 * @returns {void}
 */
const getElement = {
    single: selector => document.querySelector(selector),
    multiple: selector => document.querySelectorAll(selector)
}

export { getElement };
