import { showErrorMessage } from "../helper/message-helper.js";
import { hasNumber } from "../helper/input-validations.js";
import { createRetroSign } from "../helper/dom-helper.js"

const addRetroSignLetters = {
    /**
     * Intialise the Retro Letters Sign app
     * @param {object} configs - The configs app object
     * @returns {void}
     */
    init: (inputField, signContainer, priceContainer, configs) => {
        if(!configs) return;

        addRetroSignLetters.renderRetroSign(inputField, signContainer, priceContainer, configs);
    },
    calculateSignPrice: (message, costPerLetter, basePrice) => {
        const total = (message.length * costPerLetter) + basePrice;
        return total.toFixed(2);
    },
    emptyMessageAndPriceContainer: (container, priceContainer) => {
        container.innerHTML = '';
        priceContainer.innerHTML = '';
        container.classList.remove('active');
        priceContainer.classList.remove('active');
    },
    appendRetroSignPrice: (message, priceContainer, retroSignConfigs) => {
        const basePrice = retroSignConfigs.basePrice;
        const letterPrice = retroSignConfigs.costPerLetter;
        const totalPrice = `<h2 class="price-range mt-5 p-3">Your Retro Sign Price is: $${addRetroSignLetters.calculateSignPrice(message, letterPrice, basePrice)}</h2>`
        priceContainer.insertAdjacentHTML('afterbegin', totalPrice);
        priceContainer.classList.add('active');
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
        const { retroSignConfigs } = configs;
        if (!retroSignConfigs || !input || !container || !priceContainer) return;

        const inputMessage = input.value.toUpperCase().replace(/[^A-Z0-9 ]/g, '');

        if (inputMessage === '') {
            addRetroSignLetters.emptyMessageAndPriceContainer(container, priceContainer);
            showErrorMessage('Please type in a message');
        } else if (hasNumber(inputMessage)) {
            showErrorMessage('Please type in letters only');
        } else {
            addRetroSignLetters.emptyMessageAndPriceContainer(container, priceContainer);
            createRetroSign(inputMessage, container, retroSignConfigs);
            addRetroSignLetters.appendRetroSignPrice(inputMessage, priceContainer, retroSignConfigs);
        }
    }
}

export { addRetroSignLetters };
