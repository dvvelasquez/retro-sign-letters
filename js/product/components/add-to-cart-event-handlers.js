import { getElement } from "../../helper/dom-helper.js";

const addToCartEventHandlers = {
    /**
     * Add retro sign to cart and mini cart
     * @param {NodeListOf<HTMLElement>} imgLetters - list of images elements
     * @param {String} addToCartBtn - The class selector of the target element
     * @returns {void}
     */
     init: (imgLetters, ctaContainer, addToCartBtn) => {
        const retroSignImages = getElement.multiple(imgLetters);
        const ctaWrapper = getElement.single(ctaContainer);
        const addToCartBtnEL = ctaWrapper.querySelector(addToCartBtn);
        if (!ctaWrapper || !addToCartBtnEL) return;

        addToCartEventHandlers.setAddToCartButtonAttributes(retroSignImages, addToCartBtnEL);
        addToCartEventHandlers.showHideButtonContainer(retroSignImages, ctaWrapper);
    },
    /**
     * Set add to cart button Attributes
     * @param {NodeListOf<HTMLElement>} retroSignImages - list of images elements
     * @param {String} addToCartBtn - The class selector of the target element
     * @returns {void}
     */
    setAddToCartButtonAttributes: (retroSignImages, addToCartBtn) => {
        const isItemAvailable = retroSignImages.length > 0 ? 'true' : 'false';
        // data-button-added-text="Added"
        addToCartBtn.setAttribute('data-item-available', isItemAvailable);

        // `data-button-adding-text="Adding..."`
    },
    /**
     * 
     * @param {NodeListOf<HTMLElement>} retroSignImages - the list of images appended
     * @param {HTMLElement} ctaWrapper - The HTML element container
     */
    showHideButtonContainer: (retroSignImages, ctaWrapper) => {
        if (retroSignImages.length > 0) {
            ctaWrapper.classList.remove('d-none');
        } else {
            ctaWrapper.classList.add('d-none');
        }
    }
}

export { addToCartEventHandlers }
