import { miniCart } from "../components/mini-cart.js";
import { cartHelper } from "../helper/cart-helper.js";

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

        miniCart.renderMiniCart(cartObj, updatedItems, productData);
        miniCart.getProductCost(cartObj, updatedItems, productData);
        cartHelper.updateCartQty(cartStorage, '.minicart-link .minicart-quantity');
        cartHelper.updateMiniCartItemsQty(cartStorage, '.minicart .items__number');

        return updatedItems;
    }
}

export { cart }
