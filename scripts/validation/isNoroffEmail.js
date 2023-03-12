/**
 *  Validates the if the provided string is a Noroff issued email.
 * @param {string} email - The email string to validate.
 * @returns {boolean} - Whether or not the email is valid.
 */
const isNoroffEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(stud\.){0,1}noroff\.no$/;
    return regex.test(email);
};

export { isNoroffEmail };
