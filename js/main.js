import { getRetroSignConfigs } from "./controllers/retro-sign.controller.js";
import { displayRetroSign } from "./components/display-retro-sign.js";

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

    displayRetroSign.init(configs);
}

document.addEventListener('DOMContentLoaded', initApp);
