import { getElement } from "../../helper/dom-helper.js";

const addToCartEventHandlers = {
    /**
     * Initializes add-to-cart event handlers and button state
     * @param {NodeListOf<HTMLElement>} imgLetters - list of images elements
     * @param {String} ctaContainer - The class selector of the target element
     * @param {String} addToCartBtn - The class selector of the target element
     * @returns {void}
     */
     init: (imgLetters, ctaContainer, addToCartBtn) => {
        const retroSignImages = getElement.multiple(imgLetters);
        const ctaWrapper = getElement.single(ctaContainer);
        const addToCartBtnEL = ctaWrapper.querySelector(addToCartBtn);
        if (!ctaWrapper || !addToCartBtnEL) return;

        addToCartEventHandlers.setAddToCartButtonAttributes(retroSignImages, addToCartBtnEL);
        addToCartEventHandlers.showHidePriceContainer(retroSignImages, ctaWrapper);
    },
    /**
     * Sets availability-related data attributes on the add-to-cart button
     * @param {NodeListOf<HTMLElement>} retroSignImages - list of images elements
     * @param {HTMLElement} addToCartBtn - The target html element
     * @returns {void}
     */
    setAddToCartButtonAttributes: (retroSignImages, addToCartBtn) => {
        const isItemAvailable = retroSignImages.length > 0 ? 'true' : 'false';
        addToCartBtn.setAttribute('data-item-available', isItemAvailable);
    },
    /**
     * Shows or hides the add-to-cart container based on product availability
     * @param {NodeListOf<HTMLElement>} retroSignImages - the list of images appended
     * @param {HTMLElement} ctaWrapper - The HTML element container
     */
    showHidePriceContainer: (retroSignImages, ctaWrapper) => {
        if (retroSignImages.length > 0) {
            ctaWrapper.classList.remove('d-none');
        } else {
            ctaWrapper.classList.add('d-none');
        }
    }
}

export { addToCartEventHandlers }
