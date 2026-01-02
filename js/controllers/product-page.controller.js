import { getElement } from "../helper/dom-helper.js";

const productData = {
    /**
     * Fetches the selected product image data from the DOM.
     * @returns {String} the image src
     * @returns {String} the fetched image letter
     * @returns {Number} the cost per image letter
     * @returns {Array<Object>} An array of selected product data objects
     */
    selectedProductData: () => {
        const currentImages = getElement.multiple('[data-letter]');
        if (!currentImages || !currentImages.length) return;

        return Array.from(currentImages).map(img => (
            {
                image: img.getAttribute('src'),
                letter: img.dataset.letter,
                price: Number(img.dataset.price),
                printType: img.dataset.printStyle
            }
        ));
    },
    /**
     * Calculate the subtotal, GST and total price per item
     * @param {Number} price - the subtotal price per item
     * @param {Number} rate - the gst rate
     * @returns {Object} the calculated product price object
     */
    calculateGST: (price, rate) => {
        // Check if price and rate are valid numbers
        if (isNaN(price) || isNaN(rate)) {
            return { basePrice: 0, gstAmount: 0, total: 0 };
        }
        const gst = price * rate;
        const total = price + gst;
        return { basePrice: price, gstAmount: gst, total: total };
    }
}

export { productData }
