import { getElement, getDate } from "./dom-helper.js";

const footer = {
    displayYear: (container) => {
        const yearWrapper = getElement.single('.current-date');
        if (!yearWrapper) return;

        yearWrapper.textContent = getDate();
    }
}

export { footer }
