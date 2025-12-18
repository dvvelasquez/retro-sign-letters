import { getElement } from "../helper/dom-helper.js";
import { showMessage } from "../helper/message-helper.js";
import { hasNumber } from "../helper/input-validations.js";

const displayRetroSign = {
    /**
     * Intialise the Retro Letters Sign app
     * @param {object} configs - The configs app object
     * @returns {void}
     */
    init: (configs) => {
        const submitBtn = getElement.single('.retro-message-wrapper .retro-sign__submit-text');
        if(!submitBtn || !configs) return;

        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const inputField = getElement.single('.retro-sign__text-field');
            const signContainer = getElement.single('#sign-wrapper');
            const priceContainer = getElement.single('#price-wrapper');
            if(!inputField || !signContainer || !priceContainer) return;

            displayRetroSign.renderRetroSign(inputField, signContainer, priceContainer, configs);
        });
    },
    /**
     * Creates the image template to reuse across the app
     * @param {string} imgDir - The image directory string path
     * @param {string} letter - The letter string
     * @param {string} ext - The image extension
     * @returns {string} - The Html image template
     */
    appendImageTemplate: (imgDir, letter, ext) =>
        `<img class="retro-sign__img"
                src="${imgDir}${letter}.${ext}"
                alt="retro letter ${letter}"
                loading="lazy">`
    ,
    /**
     * Appends the Thunder Image to the container
     * @param {string} imgDir - The image directory string path
     * @param {string} img - The thunder image name
     * @param {string} ext - The image extension
     * @returns {string} - The Html template containing the Thunder Image
     */
    appendThunderImg: (imgDir, img, ext) => displayRetroSign.appendImageTemplate(imgDir, img, ext),
    /**
     * Calculate the total price per message
     * @param {number} basePrice - The base price (e.g., Thunder Img at the beginning and at the end)
     * @param {string} message - The message string to calculate the total price
     * @param {number} costPerLetter - The cost per letter
     * @returns {string} - The Html template containing the total price
     */
    calculateSignPrice: (basePrice, message, costPerLetter) => {
        const total = basePrice + message.length * costPerLetter;
        return `<h2 class="price-range mt-5 p-3">Your Retro Sign Price is: $${total.toFixed(2)}</h2>`
    },
    /**
     * Input Event Handler to display new message or error message if the user updates the input field
     * @param {String} message - The message typed inside the input field
     * @param {HTMLElement} container - The letters container element
     * @param {HTMLElement} priceContainer - the price container element
     * @returns {void}
     */
    inputEventHandlers: (message, container, priceContainer) => {
        if (!hasNumber(message)) {
            container.innerHTML = '';
            priceContainer.innerHTML = '';
        };

        if (hasNumber(message)) {
            console.log(hasNumber(message));
            showMessage('Please type in letters only');
        } else if (!message.length) {
            container.classList.remove('active');
            showMessage('Please type in a message');
        }
    },
    /**
     * Creates the Retro Sign to append to the container
     * @param {HTMLInputElement} input - The input field element
     * @param {HTMLElement} container - The letters container element
     * @param {HTMLElement} priceContainer - the price container element
     * @param {object} configs - The configs app object
     * @returns {string} the html template with the message
     */
    createRetroSign: (input, container, priceContainer, configs) => {
        const { retroSignConfigs } = configs;
        if (!retroSignConfigs) return;

        const imgDir = retroSignConfigs.imageDir;
        const letterExt = retroSignConfigs.letterExt;
        const thunderImage = retroSignConfigs.thunderImg;
        const thunderImageExt = retroSignConfigs.thunderExt;

        const message = input;

        if (message.length > 0 && !hasNumber(message)) {
            container.classList.add('active')
            container.insertAdjacentHTML('afterbegin', displayRetroSign.appendThunderImg(imgDir, thunderImage, thunderImageExt));

            for (const letter of message) {
                let imgHtml = letter === ' '
                    ? displayRetroSign.appendThunderImg(imgDir, thunderImage, thunderImageExt)
                    : displayRetroSign.appendImageTemplate(imgDir, letter, letterExt);
                container.insertAdjacentHTML('beforeend', imgHtml);
            }

            container.insertAdjacentHTML('beforeend', displayRetroSign.appendThunderImg(imgDir, thunderImage, thunderImageExt));

            const costPerLetter = retroSignConfigs.costPerLetter;
            const basePrice = retroSignConfigs.basePrice;
            priceContainer.insertAdjacentHTML('afterbegin', displayRetroSign.calculateSignPrice(basePrice, message, costPerLetter));
        }

        return message
    },
    /**
     * Renders the Retro Sign into the front-end
     * @param {HTMLInputElement} input - The input field element
     * @param {HTMLElement} container - The container element
     * @param {HTMLElement} priceContainer - the target price container element
     * @param {object} configs - The configs app object
     * @returns {void}
     */
    renderRetroSign: (input, container, priceContainer, configs) => {
        if (!input || !container || !priceContainer || !configs) return;
        const inputMessage = input.value.toUpperCase().replace(/[^A-Z0-9 ]/g, '');

        if (displayRetroSign.inputEventHandlers(inputMessage, container, priceContainer)) {
            displayRetroSign.inputEventHandlers(inputMessage, container, priceContainer)
        } else {
            displayRetroSign.createRetroSign(inputMessage, container, priceContainer, configs);
        }
    }
}

export { displayRetroSign };
