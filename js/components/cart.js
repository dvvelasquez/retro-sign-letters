import { miniCart } from "../components/mini-cart.js";
import { cartHelper } from "../helper/cart-helper.js";
import { cartEmptyMessage } from '../helper/message-helper.js'
import { getElement } from "../helper/dom-helper.js";

const cart = {
    /**
     * Removes the clicked item and update the current cart after an item has been removed
     * @param {Object} cartObj - Cart object builder
     * @param {Object} cartStorage - The local storage object handler
     * @param {Object} productData - The product data selected product image info
     * @param {Event} e - The current element target
     * @returns {void}
     */
     handleRemoveItem: (cartObj, cartStorage, productData, e) => {
        if (!e.target.classList.contains('remove-product')) return;

        const removeBtn = e.target;
        const productItem = removeBtn.closest('.product-line-item-details');

        const productId = removeBtn.dataset.uuid;
        const updatedItems = cartHelper.removeAndUpdateItem(cartStorage, productId);

        if (productItem) {
            productItem.remove();
        }

        // Append empty mini cart message if empty otherwise append cart items
        cart.appendCartMessageIfEmpty(updatedItems, '.product-line-item-summary', 'h3');

        miniCart.renderMiniCart(cartObj, updatedItems, productData);
        cart.getProductCost(cartObj, updatedItems, productData);
        cartHelper.updateCartQty(cartStorage, '.minicart-link .minicart-quantity');
        cartHelper.updateMiniCartItemsQty(cartStorage, '.minicart .items__number');

        return updatedItems;
    },
    cartClassEventHandler: (storedItems, targetEl) => {
        const containers = getElement.multiple(targetEl);
        containers.forEach(container => {
            if (!storedItems.length) {
                container.classList.add('d-none');
            } else {
                container.classList.remove('d-none');
            }
        });
    },
    /**
     * Displays the empty cart message if the cart is empty
     * @param {Object} storedItems - The local storage object handler
     * @param {String} container - The class selector of the target element
     */
    appendCartMessageIfEmpty: (storedItems, container, tag) => {
        const productSummaryWrapper = getElement.single(container);
        if (!storedItems.length && productSummaryWrapper) {
            cartEmptyMessage('Your Shopping Cart is Empty', productSummaryWrapper, tag);
            cart.cartClassEventHandler(storedItems, ['.minicart-product-total', '.minicart-footer']);
        };
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
}

export { cart }
