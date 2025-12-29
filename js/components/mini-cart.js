import { addToCart } from "./add-to-cart.js"
import { getElement } from "../helper/dom-helper.js";
import { cartHelper } from "../helper/cart-helper.js";
import { productData } from "../controllers/product-page.controller.js"
import { cartObj } from "../controllers/cart-items-obj.controller.js"

const miniCart = {
    /**
     * Init Mini Cart
     */
    getCart: (cartStorage) => {
        addToCart.innitAddToCart('.add-to-cart-btn');
        cartHelper.updateCartQty('.minicart-link .minicart-quantity');
        miniCart.renderMiniCart(cartStorage.getItems());
        cartHelper.updateMiniCartItemsQty('.minicart .items__number');
    },
    getProductCost: (cartObj, items) => {
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
    renderMiniCart: (items) => {
        const productSummaryDetails = cartHelper.productDetailsTemplate(items);
        const productSummaryWrapper = getElement.single('.product-line-item-summary');
        if (!productSummaryWrapper || !productSummaryDetails.length) return;

        productSummaryWrapper.innerHTML = '';
        productSummaryWrapper.insertAdjacentHTML('afterbegin', productSummaryDetails);

        miniCart.getProductCost(cartObj, items);
    },
    updateMiniCart: (cartObj, targetEl) => {
        cartHelper.removeProductFromCart(cartObj, targetEl);
    }
}

export { miniCart }
