import { getElement, getDate } from "./dom-helper.js";

const footer = {
    /**
     * Appends and displays the current year to the footer
     * @returns {void}
     */
    displayYear: () => {
        const yearWrapper = getElement.single('.current-date');
        if (!yearWrapper) return;

        yearWrapper.textContent = getDate();
    }
}

export { footer }
