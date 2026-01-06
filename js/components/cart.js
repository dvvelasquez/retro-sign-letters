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
        const productItem = removeBtn.closest('.card');

        const productId = removeBtn.dataset.uuid;
        const updatedItems = cartHelper.removeAndUpdateItem(cartStorage, productId);

        if (productItem) {
            productItem.remove();
        }

        const selector = document.body.classList.contains('product-page') ? '.mini-cart-error-msg' : '.cart-error-msg';

        // Append empty mini cart message if empty otherwise append cart items
        cart.appendCartMessageIfEmpty(updatedItems, selector);

        cart.getProductCost(cartObj, updatedItems, productData);
        cartHelper.updateCartQty(cartStorage, '.minicart-link .minicart-quantity');
        cartHelper.updateMiniCartItemsQty(cartStorage, ['.minicart .items__number', '.cart .items__number']);

        return updatedItems;
    },
    cartClassEventHandler: (storedItems, targetEl) => {
        const containers = getElement.multiple(targetEl);
        containers.forEach(container => {
            if (storedItems.length > 0) {
                container.classList.remove('d-none');
            } else {
                container.classList.add('d-none');
            }
        });
    },
    /**
     * Displays the empty cart message if the cart is empty
     * @param {Object} storedItems - The local storage object handler
     * @param {String} container - The class selector of the target element
     */
    appendCartMessageIfEmpty: (storedItems, container) => {
        const productSummaryWrapper = getElement.single(container);
        if (!productSummaryWrapper) return;

        const selector = document.body.classList.contains('product-page')
            ? ['.minicart-product-total', '.minicart-footer']
            : ['.cart-product-total', '.cart-footer', '.cart-item-cta'];

        const existingEmptyMsg = productSummaryWrapper.querySelector('.cart-empty-msg');
        if (storedItems.length > 0) {
            productSummaryWrapper.dataset.isActive = 'false';
            existingEmptyMsg?.remove();
            cart.cartClassEventHandler(storedItems, selector);
            return;
        };

        productSummaryWrapper.dataset.isActive = 'true';

        if (!existingEmptyMsg) {
            const htmlMessage = `
                <h3>Your Shopping Cart is Empty</h3>
                <a href="./index.html" type="button" class="btn btn-outline-dark empty-cart-btn">Create Sign letter</a>
            `
            cartEmptyMessage(htmlMessage, productSummaryWrapper);
        }
        cart.cartClassEventHandler(storedItems, selector);
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
    getCartData: (cartObj, cartStorage, productData) => {
        const items = cartStorage.getItems();
        cart.getProductCost(cartObj, items, productData);
        cartHelper.updateCartQty(cartStorage, '.minicart-link .minicart-quantity');
        cartHelper.updateMiniCartItemsQty(cartStorage, ['.minicart .items__number', '.cart .items__number']);
    },
    getCartItems: (items, container) => {
        const productSummaryDetails = cartHelper.productDetailsTemplate(items);
        const productSummaryWrapper = getElement.single(container);
        if (!productSummaryWrapper || !productSummaryDetails) return;

        productSummaryWrapper.innerHTML = '';
        productSummaryWrapper.insertAdjacentHTML('afterbegin', productSummaryDetails);
    },
    renderCart: (cartObj, cartStorage, productData) => {
        const storedItems = cartStorage.getItems();

        // Append empty mini cart message if empty otherwise append cart items
        cart.appendCartMessageIfEmpty(storedItems, '.cart-error-msg');
        cart.getCartItems(storedItems, '.cart .product-line-item-summary');
        cart.getProductCost(cartObj, storedItems, productData);
    }
}

export { cart }
