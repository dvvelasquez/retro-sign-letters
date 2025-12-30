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
    getCart: (cartObj, cartStorage, productData) => {
        const storedItems = cartStorage.getItems();

        // Append empty mini cart message if empty otherwise append cart items
        cart.appendCartMessageIfEmpty(storedItems, '.product-line-item-summary', 'h3');

        addToCart.innitAddToCart(cartObj, cartStorage, productData, '.add-to-cart-btn');
        cartHelper.updateCartQty(cartStorage, '.minicart-link .minicart-quantity');
        miniCart.renderMiniCart(cartObj, storedItems, productData);
        cart.getProductCost(cartObj, storedItems, productData);
        cartHelper.updateMiniCartItemsQty(cartStorage, '.minicart .items__number');
    },
    /**
     * Renders the Mini Cart into the UI
     * @param {Object} cartObj - Cart object builder
     * @param {Array<Object>} items - Cart items from storage
     * @param {Object} productData - The product data selected product image info
     * @returns {void}
     */
    renderMiniCart: (cartObj, items, productData) => {
        const productSummaryDetails = cartHelper.productDetailsTemplate(items);
        const productSummaryWrapper = getElement.single('.product-line-item-summary');
        if (!productSummaryWrapper || !productSummaryDetails) return;

        productSummaryWrapper.innerHTML = '';
        productSummaryWrapper.insertAdjacentHTML('afterbegin', productSummaryDetails);

        cart.getProductCost(cartObj, items, productData);
    },
    /**
     * Updates the Mini Cart after an item has been removed
     * @param {Object} cartObj - Cart object builder
     * @param {Object} cartStorage - The local storage object handler
     * @param {Object} productData - The product data selected product image info
     * @param {String} targetEl - The class of the target selector (remove btn)
     * @returns {void}
     */
     removeItemAndUpdateMiniCart: (cartObj, cartStorage, productData, targetEl) => {
        const container = getElement.single(targetEl);
        if (!container) return;

        container.addEventListener('click', (e) => {
            cart.handleRemoveItem(cartObj, cartStorage, productData, e);
        });
    }
}

export { miniCart }
