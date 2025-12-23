/**
 * fetch images based on input
 * output images on the front end
 * store images src and price inside an obj
 * push obj in a new array
 * if retro sign length remove d-none in add to cart container and append add to cart button
 * add attributes and event handlers to add to cart
 * Add to add to cart button event handler on click
 * if items true and add to cart
 *  push images/price obj in local storage
 *  update cart qty number
 *  fetch obj data and append to miniCart
 */

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
