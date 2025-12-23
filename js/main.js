import { getRetroSignConfigs } from "./controllers/retro-sign.controller.js";
import { initRetroSignLetters } from "./display-retro-sign.js";
import { addToCart } from "./components/add-to-cart.js"

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
    addToCart.innitAddToCart('.add-to-cart-btn');
}

document.addEventListener('DOMContentLoaded', initApp);
