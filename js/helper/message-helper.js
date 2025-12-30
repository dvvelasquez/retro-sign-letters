/**
 * Shows a message to the user for a short period of time
 * @param {String} message - The message to be displayed
 * @param {String} [type='danger'] - The message style to be displayed. Defaults to 'danger'
 * @returns {Void}
 */
const showInputErrorMessage = (message, type = 'danger') => {
    const alertBox = document.createElement('div');
    alertBox.className = `letter-error-msg alert alert-${type} position-fixed top-0 start-50 translate-middle-x mt-2`;
    alertBox.textContent = message;
    alertBox.setAttribute('role', 'alert');
    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.remove();
    }, 3000);
}

/**
 * Shows a message in the Mini Cart if the cart is empty
 * @param {String} message - The message to be displayed
 * @param {HTMLElement} The target html container
 * @returns {Void}
 */
const cartEmptyMessage = (message, container, tag = 'p') => {
    const emptyCartMsg = document.createElement('div');
    emptyCartMsg.className = "cart-empty-msg my-3";
    emptyCartMsg.innerHTML = `
        <${tag}>${message}</${tag}>
        <a href="./index.html" type="button" class="btn btn-outline-dark">< Create Sign letter</a>
    `;
    emptyCartMsg.setAttribute('role', 'status');
    container.appendChild(emptyCartMsg);
}

export { showInputErrorMessage, cartEmptyMessage };
