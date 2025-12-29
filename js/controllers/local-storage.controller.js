const cartStorage = {
    /**
     * Fetches the local storage product item object
     * @returns {Array<Oject>} The current cart items array
     */
    getItems: () => {
        return JSON.parse(localStorage.getItem('cartItemList')) || [];
    },
    /**
     * Set and update the local storage product item object
     * @param {Object} cartData - The updated stored product item object data
     * @returns {void}
     */
    updateItems: (cartData) => {
        const cartItems = cartStorage.getItems();
        cartItems.push(cartData);
        return localStorage.setItem('cartItemList', JSON.stringify(cartItems));
    },
    /**
     * Removes the cart item from local storage based on its iD
     * @param {String} id - the unique item ID to remove
     * @returns {void}
     */
    removeItems: (id) => {
        const updatedCartObj = cartStorage.getItems();
        const remainingItems = updatedCartObj.filter(item => item.id !== id);
        localStorage.setItem('cartItemList', JSON.stringify(remainingItems));
        return remainingItems;
    }
}

export { cartStorage }
