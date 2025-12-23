import { getElement } from "../helper/dom-helper.js";
import { miniCartController } from "../controllers/mini-cart.controller.js"

/* Oh ok, so would this be correct in the controller? 
use try/catch use data attribute as selector 
if img.length > 0 then create the new obj based on letter 
otherwise throw error
pass this to the next controller local storage to then add in the view model output the data */

const addToCart = {
    /**
     * Add retro sign to cart and mini cart
     * @param {NodeListOf<HTMLElement>} imgLetters - list of images elements
     * @param {String} addToCartBtn - The class selector of the target element
     * @returns {void}
     */
    innitAddToCart: (addToCartBtn) => {
        const addToCartBtnEL = getElement.single(addToCartBtn);
        if (!addToCartBtnEL) return;

        addToCartBtnEL.addEventListener('click', (e) => {
            e.preventDefault();
            const isItemAvailable = addToCartBtnEL.getAttribute('data-item-available') === 'true';

            if (isItemAvailable) {
                miniCartController.init();
            }
            addToCart.updateCartQty();
        });

        addToCart.updateCartQty();
    },
    updateCartQty: () => {
        const cartItemObj = JSON.parse(localStorage.getItem('cartItemList')) || [];
        if (!cartItemObj || !cartItemObj.length || cartItemObj.length === null) return;
        const qtyBadge = getElement.single('.minicart-link .minicart-quantity');

        qtyBadge.textContent = cartItemObj.length;
    }
}

export { addToCart }
