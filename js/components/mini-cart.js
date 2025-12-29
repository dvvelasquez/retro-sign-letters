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
        addToCart.innitAddToCart(cartObj, cartStorage, productData, '.add-to-cart-btn');
        cartHelper.updateCartQty(cartStorage, '.minicart-link .minicart-quantity');
        miniCart.renderMiniCart(cartObj, cartStorage.getItems(), productData);
        miniCart.getProductCost(cartObj, cartStorage.getItems(), productData);
        cartHelper.updateMiniCartItemsQty(cartStorage, '.minicart .items__number');
    },
    /**
     * Calculates and renders cart pricing totals including GST
     * @param {Object} cartObj - Cart object builder
     * @param {Array<Object>} items - Current cart items
     * @param {Object} productData - Pricing and GST calculator
     * @returns {void}
     */
    getProductCost: (cartObj, items, productData) => {
        const cartSubtotal = cartObj.cartSubtotalData(items);
        const subTotalWrapper = getElement.single('.sub-total');
        const totalGstWrapper = getElement.single('.total-tax-cost');
        const totalAmountWrapper = getElement.single('.total-amount');
        const { basePrice, gstAmount, total } = productData.calculateGST(cartSubtotal, 0.10);

        subTotalWrapper.innerHTML = '';
        subTotalWrapper.insertAdjacentHTML('afterbegin', `$${items.length ? basePrice.toFixed(2) : 0}`);
        totalGstWrapper.innerHTML = '';
        totalGstWrapper.insertAdjacentHTML('afterbegin', `$${items.length ? gstAmount.toFixed(2) : 0}`);
        totalAmountWrapper.innerHTML = '';
        totalAmountWrapper.insertAdjacentHTML('afterbegin', `$${items.length ? total.toFixed(2) : 0}`);
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
        if (!productSummaryWrapper || !productSummaryDetails.length) return;

        productSummaryWrapper.innerHTML = '';
        productSummaryWrapper.insertAdjacentHTML('afterbegin', productSummaryDetails);

        miniCart.getProductCost(cartObj, items, productData);
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
