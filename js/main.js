import { getRetroSignConfigs } from "./controllers/retro-sign.controller.js";
import { cartStorage } from "./controllers/local-storage.controller.js"
import { cartObj } from "./controllers/cart-items-obj.controller.js"
import { initRetroSignLetters } from "./display-retro-sign.js";
import { miniCart } from "./components/mini-cart.js";

/**
 * Initialises the Retro Sign Letters app.
 * Fetches the app configurations to initialise the app otherwise logs an error message and exits.
 * @returns {void}
 */
const initApp = async () => {
    const configs = await getRetroSignConfigs();

    if (configs.status === 'error') {
        console.error('Failed to initialize app — configuration error.');
        return;
    }

    initRetroSignLetters(configs);
    miniCart.getCart(cartStorage);
    miniCart.updateMiniCart(cartObj, '.minicart .product-line-item-summary');
}

document.addEventListener('DOMContentLoaded', initApp);
