import { getElement } from "../helper/dom-helper.js";

const productData = {
    selectedProductData: () => {
        const currentImages = getElement.multiple('[data-letter]');
        if (!currentImages || !currentImages.length) return;

        return Array.from(currentImages).map(img => (
            {
                image: img.getAttribute('src'),
                letter: img.dataset.letter,
                price: Number(img.dataset.price)
            }
        ));
    },
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
