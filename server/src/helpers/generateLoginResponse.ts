import { LoginResponse } from "src/@types";

/**
 * Utility function for determining whether a user can login or not, purposefully made to not describe the error and only report if the user
 * can login as to avoid any extra details on the login action, which could potentially give away the password/credentials of the user
 *
 * @param canLogin Whether the user can login or not
 * @param token The session token, if exists, only generated upon successful pre-requisite checks
 * @returns The login response
 */
export const generateLoginResponse = (
    canLogin: boolean,
    token = "",
): LoginResponse => {
    return { canLogin, token };
};
