import { showInputErrorMessage } from "../helper/message-helper.js";
import { hasNumber } from "../helper/input-validations.js";
import { createRetroSign } from "../helper/dom-helper.js"

const addRetroSignLetters = {
    /**
     * Initialises the retro sign generator
     * @param {HTMLInputElement} inputField - The input field element
     * @param {HTMLElement} signContainer - The images container
     * @param {HTMLElement} priceContainer - The container with the total amounts
     * @param {Object} configs - The configs app object
     * @returns {void}
     */
    init: (inputField, signContainer, priceContainer, retroSignConfigs, retroTypeConfigs) => {
        addRetroSignLetters.renderRetroSign(inputField, signContainer, priceContainer, retroSignConfigs, retroTypeConfigs);
    },
    /**
     * Calculate the total price for the retro sign letters
     * @param {String} message - The given message from the input
     * @param {Number} costPerLetter - The cost per letter
     * @param {Number} basePrice - The default initial price
     * @returns {String} The total cost per retro sign letters
     */
    calculateSignPrice: (message, costPerLetter, basePrice) => {
        const total = (message.length * costPerLetter) + basePrice;
        return total.toFixed(2);
    },
    /**
     * Clears the rendered letter images and pricing UI
     * @param {HTMLElement} container - The image letters container element
     * @param {HTMLElement} priceContainer - The price container element
     * @returns {void}
     */
    emptyMessageAndPriceContainer: (container, priceContainer) => {
        container.innerHTML = '';
        priceContainer.innerHTML = '';
        container.classList.remove('active');
        priceContainer.classList.remove('active');
    },
    /**
     * Calculates and append price based on the given message
     * @param {String} message - the given message from the input field
     * @param {HTMLElement} priceContainer - The price container element
     * @param {Object} retroSignConfigs - The retro sign configs obj
     */
    appendRetroSignPrice: (message, priceContainer, retroSignConfigs, retroTypeConfigs) => {
        const basePrice = retroSignConfigs.basePrice;
        const letterPrice = retroSignConfigs.costPerLetter;
        const totalPrice = `
            <div class="retro-sign-total-price">
                <h2 class="price-range">
                    Your Retro Sign Price is: $${addRetroSignLetters.calculateSignPrice(message, letterPrice, basePrice)}
                </h2>
                <h4 class="print-style">Standard Print Style: ${retroTypeConfigs.type}</h4>
            </div>
            `
        priceContainer.insertAdjacentHTML('afterbegin', totalPrice);
        priceContainer.classList.add('active');
    },
    /**
     * Renders the Retro Sign based on the given message
     * @param {HTMLInputElement} input - The input field element
     * @param {HTMLElement} container - The container element
     * @param {HTMLElement} priceContainer - the target price container element
     * @param {object} configs - The configs app object
     * @returns {void}
     */
    renderRetroSign: (input, container, priceContainer, retroSignConfigs, retroTypeConfigs) => {
        if (!retroSignConfigs || !retroTypeConfigs || !input || !container || !priceContainer) return;

        const inputMessage = input.value.toUpperCase().replace(/[^A-Z0-9 ]/g, '');

        if (inputMessage === '') {
            addRetroSignLetters.emptyMessageAndPriceContainer(container, priceContainer);
            showInputErrorMessage('Please type in a message with no special characters or numbers');
        } else if (hasNumber(inputMessage)) {
            showInputErrorMessage('Please type in letters only');
        } else {
            addRetroSignLetters.emptyMessageAndPriceContainer(container, priceContainer);
            createRetroSign(inputMessage, container, retroSignConfigs, retroTypeConfigs);
            addRetroSignLetters.appendRetroSignPrice(inputMessage, priceContainer, retroSignConfigs, retroTypeConfigs);
        }
    }
}

export { addRetroSignLetters };
