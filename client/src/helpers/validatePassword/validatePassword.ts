type ValidatePasswordResponse = {
    lowercaseMatch: boolean;
    uppercaseMatch: boolean;
    symbolMatch: boolean;
};

/**
 * This function aids in the validation of the password, following a step-by-step algorithm to determine if the password is valid
 * @param password The password the user is attempting to enter into the sign up form
 */
export const validatePassword = (
    password: string,
): ValidatePasswordResponse => {
    const lowercaseMatch = password.match(/[a-z]/gu);
    const uppercaseMatch = password.match(/[A-Z]/gu);
    const symbolMatch = password.match(/[\W]/gu);
    return {
        lowercaseMatch: lowercaseMatch !== null,
        symbolMatch: symbolMatch !== null,
        uppercaseMatch: uppercaseMatch !== null,
    };
};
