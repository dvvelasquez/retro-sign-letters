import { getElement } from "../helper/dom-helper.js";
import { cartHelper } from "../helper/cart-helper.js";
import { cartStorage } from "../controllers/local-storage.controller.js"
import { cartObj } from "../controllers/cart-items-obj.controller.js"
import { productData } from "../controllers/product-page.controller.js"
import { miniCart } from "./mini-cart.js"

const addToCart = {
    /**
     * Add retro sign to cart
     * @param {NodeListOf<HTMLElement>} imgLetters - list of images elements
     * @param {String} addToCartBtn - The class selector of the target element
     * @return {Object} The Updated Cart Object
     */
    innitAddToCart: (addToCartBtn) => {
        const addToCartBtnEL = getElement.single(addToCartBtn);
        if (!addToCartBtnEL) return;

        addToCartBtnEL.addEventListener('click', (e) => {
            e.preventDefault();
            if (addToCartBtnEL.dataset.itemAvailable !== 'true') return;

            const getProductData = productData.selectedProductData();
            const cartData = cartObj.buildCartObject(getProductData);
            cartStorage.updateItems(cartData);
            cartHelper.updateCartQty('.minicart-link .minicart-quantity');
            cartHelper.updateMiniCartItemsQty('.minicart .items__number');
            miniCart.renderMiniCart(cartStorage.getItems());

            setTimeout(() => {
                getElement.single('.minicart-link')?.click();
            }, 1000);
        });
    }
}

export { addToCart }
