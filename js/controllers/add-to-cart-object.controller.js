import { getElement } from "../helper/dom-helper.js"

const addToCartObj = {
    init: () => {
        if (localStorage.getItem('cartItemList' === null)) {
            localStorage.setItem('cartItemList', '[]');
        };

        const cartItems = addToCartObj.getItemsFromLocalStorage();

        const currentCartObj = addToCartObj.imagesCartObject();
        if (!currentCartObj) return;

        cartItems.push(currentCartObj);
        addToCartObj.updateItemsInLocalStorage(cartItems);
    },
    imagesCartObject: () => {
        const currentImages = getElement.multiple('[data-letter]');
        if (!currentImages.length) return;

        const items = Array.from(currentImages).map(img => (
            {
                image: img.getAttribute('src'),
                letter: img.dataset.letter,
                price: Number(img.dataset.price)
            }
        ));

        const totalPrice = items.reduce(
            (acc, item) => acc + Number(item.price),
            0,
        );

        return {
            items,
            totalPrice
        };
    },
    getItemsFromLocalStorage: () => {
        return JSON.parse(localStorage.getItem('cartItemList')) || [];
    },
    updateItemsInLocalStorage: (data) => {
        localStorage.setItem('cartItemList', JSON.stringify(data));
    }
}

export { addToCartObj }
