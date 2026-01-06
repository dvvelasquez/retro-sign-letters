import { addToCart } from "./add-to-cart.js"
import { getElement } from "../helper/dom-helper.js";
import { cartHelper } from "../helper/cart-helper.js";
import { cart } from "../components/cart.js";

const miniCart = {
    /**
     * Initialises Mini Cart behavior and synchronises cart state with the UI
     * @param {Object} cartObj - Cart object builder
     * @param {Object} cartStorage - The local storage object handler
     * @param {Object} productData - Selected product data and pricing logic
     * @returns {void}
     */
    renderMiniCart: (cartObj, cartStorage, productData) => {
        const storedItems = cartStorage.getItems();

        addToCart.innitAddToCart(cartObj, cartStorage, productData, '.add-to-cart-btn');
        miniCart.updateMiniCartUI(cartObj, storedItems, productData);
    },
    /**
     * Renders the Mini Cart into the UI
     * @param {Object} cartObj - Cart object builder
     * @param {Array<Object>} items - Cart items from storage
     * @param {Object} productData - The product data selected product image info
     * @returns {void}
     */
     updateMiniCartUI: (cartObj, items, productData) => {
        cart.getCartItems(items, '.minicart .product-line-item-summary');
        cart.getProductCost(cartObj, items, productData);

        if (items.length > 0) return;
        // Append empty mini cart message if empty otherwise append cart items
        cart.appendCartMessageIfEmpty(items, '.mini-cart-error-msg');
    },
    /**
     * Updates the Mini Cart after an item has been removed
     * @param {Object} cartObj - Cart object builder
     * @param {Object} cartStorage - The local storage object handler
     * @param {Object} productData - The product data selected product image info
     * @param {String} targetEl - The class of the target selector (remove btn)
     * @returns {void}
     */
     removeItemAndUpdateCart: (cartObj, cartStorage, productData, targetEl) => {
        const container = getElement.single(targetEl);
        if (!container) return;

        container.addEventListener('click', (e) => {
            cart.handleRemoveItem(cartObj, cartStorage, productData, e);
        });
    }
}

export { miniCart }
