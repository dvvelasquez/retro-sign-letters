const cartObj = {
    /**
     * Fetch the images and price per item added to the cart
     * @returns {Object} The Cart Items Object
     */
    buildCartObject: (items = []) => {
        try {
            const totalPrice = items.reduce(
                (acc, item) => acc + Number(item.price),
                0,
            );

            return {
                id: crypto.randomUUID(),
                items,
                totalPrice
            };
        } catch (error) {
            console.error('Failed to generate cart object:', error);
            return { id:'', items: [], totalPrice: 0 };
        }
    },
    cartSubtotalData: (items = []) => {
        return items.reduce(
            (acc, total) => acc + total.totalPrice,
            0,
        );
    },
}

export { cartObj }