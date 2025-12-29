/**
 * Checks whether a string contains at least one numeric character
 * @param {String} string - The given message in the input message
 * @returns {Boolean} True if string contains number otherwise false
 */
function hasNumber(string) {
    return /\d/.test(string);
}

export { hasNumber }
