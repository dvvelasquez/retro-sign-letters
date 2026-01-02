const cartObj = {
    /**
     * Builds the cart object and unique cart ID based on the provided cart items.
     * @param {Array<Object>} items - the array of cart items
     * @returns {Object} The Cart Items data Object
     * @returns {id} The unique Cart ID
     * @returns {Array<Object>} items - The Cart Items data Object
     * @returns {Number} The total cart price
     */
    buildCartObject: (items = []) => {
        try {
            const totalPrice = items.reduce(
                (acc, item) => acc + Number(item.price),
                0,
            );

            const printStyle = items[0].printType

            return {
                id: crypto.randomUUID(),
                items,
                totalPrice,
                printStyle
            };
        } catch (error) {
            console.error('Failed to generate cart object:', error);
            return { id:'', items: [], totalPrice: 0, printStyle: '' };
        }
    },
    /**
     * Calculates the total price for the retro sign
     * @param {Array<Object>} items - the array of cart items
     * @returns {Number} The final price for the retro sign
     */
    cartSubtotalData: (items = []) => {
        return items.reduce(
            (acc, total) => acc + total.totalPrice,
            0,
        );
    },
}

export { cartObj }