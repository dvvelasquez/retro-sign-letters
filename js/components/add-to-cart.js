import { getElement } from "../helper/dom-helper.js";
import { cartHelper } from "../helper/cart-helper.js";
import { miniCart } from "./mini-cart.js"

const addToCart = {
    /**
     * Initialise the add to cart
     * @param {*} cartObj - Cart object builder
     * @param {*} cartStorage - The local storage object handler
     * @param {*} productData - The product data selected product image info
     * @param {*} addToCartBtn - The class of the target selector
     * @returns {void}
     */
    innitAddToCart: (cartObj, cartStorage, productData, addToCartBtn) => {
        const addToCartBtnEL = getElement.single(addToCartBtn);
        if (!addToCartBtnEL) return;

        addToCartBtnEL.addEventListener('click', (e) => {
            e.preventDefault();
            if (addToCartBtnEL.dataset.itemAvailable !== 'true') return;

            const getProductData = productData.selectedProductData();
            const cartData = cartObj.buildCartObject(getProductData);
            cartStorage.updateItems(cartData);
            cartHelper.updateCartQty(cartStorage, '.minicart-link .minicart-quantity');
            cartHelper.updateMiniCartItemsQty(cartStorage, '.minicart .items__number');
            miniCart.renderMiniCart(cartObj, cartStorage.getItems(), productData);

            setTimeout(() => {
                getElement.single('.minicart-link')?.click();
            }, 1000);
        });
    }
}

export { addToCart }
