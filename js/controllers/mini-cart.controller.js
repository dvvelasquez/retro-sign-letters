import { addToCartObj } from "./add-to-cart-object.controller.js"
/* const cartData = LocalStorageController.getCart();
MiniCartView.render(cartData); */

const miniCartController = {
    init: () => {
        addToCartObj.init();
    }
}

export  { miniCartController }
