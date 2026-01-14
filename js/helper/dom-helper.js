/**
 * Query selector to target a single or multiple elements from the DOM
 * @param {string} selector - The css element selector
 * @returns {void}
 */
const getElement = {
    single: selector => document.querySelector(selector),
    multiple: selector => document.querySelectorAll(selector)
}

/**
 * Fetches the current full year
 * @returns {String} The current year as string
 */
const getDate = () => {
    const currentDate = new Date().getFullYear();
    if (!currentDate) return;

    return currentDate.toString();
}

export { getElement, getDate };
