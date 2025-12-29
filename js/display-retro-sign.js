import { getElement } from "./helper/dom-helper.js";
import { addRetroSignLetters } from "./components/retro-sign-letters.js";
import { addToCartEventHandlers } from "./product/components/add-to-cart-event-handlers.js";

const initRetroSignLetters = (configs) => {
    const submitBtn = getElement.single('.retro-message-wrapper .retro-sign__submit-text');
    if(!submitBtn || !configs) return;

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const inputField = getElement.single('.retro-sign__text-field');
        const signContainer = getElement.single('#sign-wrapper');
        const priceContainer = getElement.single('#price-wrapper');
        if(!inputField || !signContainer || !priceContainer) return;

        addRetroSignLetters.init(inputField, signContainer, priceContainer, configs);
        addToCartEventHandlers.init('.retro-sign__img', '.call-to-actions-wrapper', '.add-to-cart-btn');
    });
}

export { initRetroSignLetters };
