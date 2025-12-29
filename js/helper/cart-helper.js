import { getElement } from "../helper/dom-helper.js";

const cartHelper = {
    /**
     * Updates the cart qty badge in the main nav
     * @param {Object} cartStorage - the cart item object
     * @param {String} targetEl - the class selector of the target element
     * @returns {void}
     */
    updateCartQty: (cartStorage, targetEl) => {
        const cartItems = cartStorage.getItems();
        const qtyBadge = getElement.single(targetEl);
        if (!qtyBadge || !cartItems) return;

        qtyBadge.textContent = cartItems.length;
    },
    /**
     * Updates the cart items count in the mini cart header and subtotal
     * @param {Object} cartStorage - the cart item object
     * @param {String} targetEl - the class selector of the target element
     * @returns {void}
     */
    updateMiniCartItemsQty: (cartStorage, targetEl) => {
        const cartItems = cartStorage.getItems();
        const miniCartItemsQty = getElement.multiple(targetEl);
        if (!miniCartItemsQty.length || !cartItems) return;

        miniCartItemsQty.forEach(el => {
            const isMultipleItems = cartItems.length >= 2 ? `items` : `item`;
            el.textContent = `${cartItems.length} ${isMultipleItems}`;
        })
    },
    /**
     * Creates the mini cart image html template
     * @param {String} src - The image src url
     * @param {String} letter - the given letter from the input message
     * @param {Number} price - the cost per letter
     * @returns {String} The image html template
     */
    miniCartImageTemplate: (src, letter, price) => {
        return `<img src="${src}"
            class="card-img-top rounded-0"
            alt="retro letter ${letter}"
            data-cart-letter="${letter}"
            data-letter-price="${price}"
            loading="lazy">`
    },
    /**
     * Builds the product summary data from stored cart items.
     * @param {Object} storedItems - the local storage object
     * @returns {Array<Object>} the product items array containing the ID, Images, Title and Total Price
     */
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
    /**
     * Creates card containing each of the product details
     * @param {Array<Object>} storedItems - the local storage object
     * @returns {String} The card item html template
     */
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
    /**
     * Remove the item from storage and retruns updated cart
     * @param {Object} cartStorage - The local storage handler
     * @param {string} productId - The item UUID to remove
     * @returns {Array<Object>} Updated cart items
     */
     removeAndUpdateItem: (cartStorage, productId) => {
        return cartStorage.removeItems(productId);
    }
}

export { cartHelper }
