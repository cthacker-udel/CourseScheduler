import { AES } from "crypto-js";
import type { LoginRequest } from "src/@types";

import type { SessionToken } from "../../@types/Encryption/SessionToken";
import { TOKEN_TIME_ALLOWED } from "./constants";
import { LOGIN_HASH_SECRET, SESSION_TOKEN_KEY } from "./keys";

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
            SESSION_TOKEN_KEY,
            JSON.stringify({
                session: cipherText,
                validUntil: Date.now() + TOKEN_TIME_ALLOWED,
            } as SessionToken),
        );
    }
};
