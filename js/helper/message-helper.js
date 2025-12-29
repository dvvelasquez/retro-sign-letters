/**
 * Shows a message to the user for a short period of time
 * @param {String} message - The message to be displayed
 * @param {String} [type='danger'] - The message style to be displayed. Defaults to 'danger'
 * @returns {Void}
 */
const showErrorMessage = (message, type = 'danger') => {
    const alertBox = document.createElement('div');
    alertBox.className = `letter-error-msg alert alert-${type} position-fixed top-0 start-50 translate-middle-x mt-2`;
    alertBox.textContent = message;
    alertBox.setAttribute('role', 'alert');
    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.remove();
    }, 3000);
}

export { showErrorMessage };
