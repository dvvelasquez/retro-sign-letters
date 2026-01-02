import { getRetroSignConfigs } from "./controllers/retro-sign.controller.js";
import { cartStorage } from "./controllers/local-storage.controller.js";
import { cartObj } from "./controllers/cart-items-obj.controller.js";
import { productData } from "./controllers/product-page.controller.js";
import { initRetroSignLetters } from "./display-retro-sign.js";
import { miniCart } from "./components/mini-cart.js";
import { cart } from "./components/cart.js";

/**
 * Initialises the Retro Sign Letters app.
 * Fetches the app configurations to initialise the app otherwise logs an error message and exits.
 * @async
 * @returns {void}
 */
const initApp = async () => {
    const configs = await getRetroSignConfigs();

    if (configs.status === 'error') {
        console.error('Failed to initialize app — configuration error.');
        return;
    }

    const { retroSignConfigs, retroTypeConfigs } = configs;

    if (document.body.classList.contains('product-page')) {
        initRetroSignLetters(retroSignConfigs, retroTypeConfigs);
        miniCart.getMiniCart(cartObj, cartStorage, productData);
    }

    if (document.body.classList.contains('cart-page')) {
        cart.renderCartItems(cartStorage.getItems(), '.cart .product-line-item-summary');
    }

    miniCart.removeItemAndUpdateMiniCart(cartObj, cartStorage, productData, '.product-line-item-summary');
    cart.getCartData(cartObj, cartStorage, productData);
}

document.addEventListener('DOMContentLoaded', initApp);
