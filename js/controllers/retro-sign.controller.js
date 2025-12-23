/**
 * Fetches the Retro Sign Letters configs
 * @async
 * @returns {Promise} An Object containing the request status, appConfigs objects and code
 */
const getRetroSignConfigs = async () => {
    const retroSignConfigEndPath = './js/config/retro-sign.config.json';

    try {
        const response = await fetch(retroSignConfigEndPath);
        if(!response.ok) {
            throw new Error(
                `Failed to fetch ${retroSignConfigEndPath}: ${response.status} ${response.statusText}`
            );
        }
        const jsonResponse = await response.json();
        return {
            status: 'ok',
            retroSignConfigs: jsonResponse.retro_sign,
            code: 200
        }
    } catch (error) {
        if (error.name === "SyntaxError") {
            console.error(`JSON parse error in ${retroSignConfigEndPath}:`, error.message);
        } else {
            console.error(`Error fetching ${retroSignConfigEndPath}:`, error.message);
        }

        return {
            status: 'error',
            retroSignConfigs: {},
            code: 500
        }
    }
}

export { getRetroSignConfigs }
