/* eslint-disable capitalized-comments -- disabled for prettier disable */
import { AES } from "crypto-js";
import type { LoginRequest } from "src/@types";
import { MILLISECONDS } from "src/common";

import { LOGIN_HASH_SECRET } from "./keys";

const FIVE_HOURS = 5;
const MIN_LENGTH = 0;

/**
 *
 * @param loginInformation - The login information we are hashing
 */
export const hashLoginInformation = (loginInformation: LoginRequest): void => {
    if (
        Object.keys(loginInformation).length > MIN_LENGTH &&
        localStorage.getItem(loginInformation.username) !== null
    ) {
        const cipherText = AES.encrypt(
            JSON.stringify(loginInformation),
            LOGIN_HASH_SECRET,
        ).toString();
        localStorage.setItem(
            loginInformation.username,
            JSON.stringify({
                session: cipherText,
                // prettier-ignore
                validUntil: Date.now() + (MILLISECONDS.HOUR * FIVE_HOURS),
            }),
        );
    }
};
