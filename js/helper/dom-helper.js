import { hasNumber } from "./input-validations.js";

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
     * Creates the image template to reuse across the app
     * @param {string} imgDir - The image directory string path
     * @param {string} letter - The letter string
     * @param {string} ext - The image extension
     * @returns {string} - The Html image template
     */
 const appendImageTemplate = (imgDir, letter, ext, price, printType) =>
    `<img class="retro-sign__img"
        src="${imgDir}${letter}.${ext}"
        alt="retro letter ${letter}"
        data-letter="${letter}"
        data-price="${price}"
        data-print-style="${printType}"
        loading="lazy">`;

/**
 * Appends the Thunder Image to the container
 * @param {string} imgDir - The image directory string path
 * @param {string} img - The thunder image name
 * @param {string} ext - The image extension
 * @returns {string} - The Html template containing the Thunder Image
 */
 const appendThunderImg = (imgDir, img, ext, letterPrice, printType) => appendImageTemplate(imgDir, img, ext, letterPrice, printType);

/**
 * Creates the Retro Sign to append to the container
 * @param {HTMLInputElement} input - The input field element
 * @param {HTMLElement} container - The letters container element
 * @param {HTMLElement} priceContainer - the price container element
 * @param {object} configs - The configs app object
 * @returns {string} the html template with the message
 */
 const createRetroSign = (input, container, retroSignConfigs, retroTypeConfigs) => {
    const imgDir = retroSignConfigs.imageDir;
    const letterExt = retroSignConfigs.letterExt;
    const letterPrice = retroSignConfigs.costPerLetter;
    const thunderImage = retroSignConfigs.thunderImg;
    const thunderImageExt = retroSignConfigs.thunderExt;
    const printType = retroTypeConfigs.type;

    const message = input;

    if (message.length > 0 && !hasNumber(message)) {
        container.classList.add('active')
        container.insertAdjacentHTML('afterbegin', appendThunderImg(imgDir, thunderImage, thunderImageExt, letterPrice, printType));

        for (const letter of message) {
            let imgHtml = letter === ' '
                ? appendThunderImg(imgDir, thunderImage, thunderImageExt, letterPrice, printType)
                : appendImageTemplate(imgDir, letter, letterExt, letterPrice, printType);
            container.insertAdjacentHTML('beforeend', imgHtml);
        }

        container.insertAdjacentHTML('beforeend', appendThunderImg(imgDir, thunderImage, thunderImageExt, letterPrice, printType));
    }

    return message;
}

export { getElement, createRetroSign };
