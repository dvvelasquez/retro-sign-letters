const cartStorage = {
    getItems: () => {
        return JSON.parse(localStorage.getItem('cartItemList')) || [];
    },
    updateItems: (cartData) => {
        const cartItems = cartStorage.getItems();
        cartItems.push(cartData);
        return localStorage.setItem('cartItemList', JSON.stringify(cartItems));
    },
    removeItems: (id) => {
        const updatedCartObj = cartStorage.getItems();
        const itemId = updatedCartObj.filter(item => item.id !== id);
        localStorage.setItem('cartItemList', JSON.stringify(itemId));
    }
}

export { cartStorage }
