import { getElement } from "../helper/dom-helper.js";
import { cartStorage } from "../controllers/local-storage.controller.js";
import { miniCart } from "../components/mini-cart.js";

const cartHelper = {
    /**
     * Updates the Cart Qty badge on the main nav
     * @returns {void}
     */
    updateCartQty: (targetEl) => {
        const cartItems = cartStorage.getItems();
        const qtyBadge = getElement.single(targetEl);
        if (!qtyBadge || !cartItems) return;

        qtyBadge.textContent = cartItems.length;
    },
    updateMiniCartItemsQty: (targetEl) => {
        const cartItems = cartStorage.getItems();
        const miniCartItemsQty = getElement.multiple(targetEl);
        if (!miniCartItemsQty.length || !cartItems) return;

        miniCartItemsQty.forEach(el => {
            const isMultipleItems = cartItems.length >= 2 ? `items` : `item`;
            el.textContent = `${cartItems.length} ${isMultipleItems}`;
        })
    },
    miniCartImageTemplate: (src, letter, price) => {
        return `<img src="${src}"
            class="card-img-top rounded-0"
            alt="retro letter ${letter}"
            data-cart-letter="${letter}"
            data-letter-price="${price}"
            loading="lazy">`
    },
    getProductDetails: (storedItems) => {
        const updatedCartObj = storedItems;
        if (!updatedCartObj && updatedCartObj === null) return;

        const productSummary = updatedCartObj.map(cartItem => {
            const cartItems = cartItem.items;
            const productId = cartItem.id;
            const cartImages = cartItems.map(item => cartHelper.miniCartImageTemplate(item.image, item.letter, item.price)).join('');

            const cartTitle = cartItems.map(item => {
                if (item.letter === 'THUNDER') {
                    return ' ';
                }

                return item.letter;
            }).join('')

            const cartTotalPrice = cartItem.totalPrice;

            return {
                productId,
                cartImages,
                cartTitle,
                cartTotalPrice
            }
        });

        return productSummary;
    },
    productDetailsTemplate: (storedItems) => {
        const productDetails = cartHelper.getProductDetails(storedItems);
        if (!Array.isArray(productDetails)) return;

        return productDetails.map(product => {
            return `
                <div class="row product-line-item-details py-3">
                    <div class="col-5 line-item-details-image">
                        <div class="line-item-image-wrapper">
                            ${product.cartImages ? product.cartImages : 'https://dummyimage.com/600x400/000/fff'}
                        </div>
                    </div>
                    <div class="col-7 card-body line-item-details">
                        <div class="line-item-header">
                            <h5 class="card-title line-item-title">${product.cartTitle}</h5>
                            <div class="remove-line-item">
                                <button type="button"
                                    class="remove-btn
                                    remove-product"
                                    aria-label="Remove Item"
                                    data-uuid="${product.productId}">
                                </button>
                            </div>
                        </div>
                        <div class="card-text line-item-price">
                            <span class="amount"> <bdi>${product.cartTotalPrice}</bdi></span>
                            <small class="amount">(incl. GST)</small>
                        </div>
                    </div>
                </div>
            `
        }).join('');
    },
    removeProductFromCart: (cartObj, targetEl) => {
        const container = getElement.single(targetEl);
        if (!container) return;

        container.addEventListener('click', (e) => {
            const removeBtn = e.target;
            const productId = removeBtn.dataset.uuid;
            cartStorage.removeItems(productId);

            container.innerHTML = '';
            miniCart.renderMiniCart(cartStorage.getItems());
            miniCart.getProductCost(cartObj, cartStorage.getItems());
            cartHelper.updateCartQty('.minicart-link .minicart-quantity');
            cartHelper.updateMiniCartItemsQty('.minicart .items__number');
        })
    },
}

export { cartHelper }
