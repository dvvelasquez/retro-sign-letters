import { getElement } from "../helper/dom-helper.js";
import { showMessage } from "../helper/message-helper.js";

const displayRetroSign = {
    init: () => {
        const wrapper = getElement.single('.retro-sign-wrapper');
        const submitBtn = getElement.single('.retro-message-wrapper .retro-sign__submit-text');
        if(!submitBtn) return;

        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const inputField = wrapper.querySelector('.retro-sign__text-field');
            const signContainer = wrapper.querySelector('#sign-wrapper');
            const priceContainer = wrapper.querySelector('#price-wrapper');
            if(!inputField || !signContainer || !priceContainer) return;

            displayRetroSign.renderRetroSign(inputField, signContainer, priceContainer);
        });
    },
    appendImageTemplate: (letter, imgExtension) => {
        const imgPath = `./assets/images/retro-letters/${letter}.${imgExtension}`
        return `
            <img class="retro-sign__img" src="${imgPath}" alt="retro sign" loading="lazy">
        `
    },
    appendThunderImg: () => displayRetroSign.appendImageTemplate('THUNDER', 'gif'),
    calculateSingPrice: (message) => `<h2 class="price-range mt-5 p-3">Your Retro Sign Price is: $${((message.length * 10) + 20).toFixed(2)}</h2>`,
    createRetroSign: (input, container, priceContainer) => {
        container.innerHTML = '';
        const message = input.value.toUpperCase();

        if (message.length > 0) {
            container.classList.add('active')
            container.insertAdjacentHTML('afterbegin', displayRetroSign.appendThunderImg());

            for (const letter of message) {
                let letterMessage = letter;
                if (letterMessage === ' ') {
                    letterMessage = displayRetroSign.appendThunderImg();
                } else {
                    letterMessage = displayRetroSign.appendImageTemplate(letterMessage, 'png');
                }
                container.insertAdjacentHTML('beforeend', letterMessage);
            }

            container.insertAdjacentHTML('beforeend', displayRetroSign.appendThunderImg());
            priceContainer.innerHTML = '';
            priceContainer.insertAdjacentHTML('afterbegin', displayRetroSign.calculateSingPrice(message));
        } else {
            container.classList.remove('active');
            showMessage('Please type in a message');
        }

        return message
    },
    renderRetroSign: (input, container, priceContainer) => {
        if (!input || !container || !priceContainer) return;
        displayRetroSign.createRetroSign(input, container, priceContainer);
    }
}

export { displayRetroSign };
