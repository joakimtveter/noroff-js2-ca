/**
 *  Validates the if the provided string is a valid email.
 * @param {string} email - The email string to validate.
 * @returns {boolean} - Whether or not the email is valid.
 */
const isValidEmail = (email) => {
    const regex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
};

export { isValidEmail };
