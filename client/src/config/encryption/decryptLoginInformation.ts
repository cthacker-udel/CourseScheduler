import { AES, enc } from "crypto-js";
import type { LoginRequest } from "src/@types";

import { LOGIN_HASH_SECRET } from "./keys";

/**
 * Utility function for decrypting the session token using AES from the crypto-js library
 *
 * @param encryptedLoginInformation - The encrypted login information
 * @returns The decrypted login information as a SessionToken, if information is invalid, returns undefined
 */
export const decryptLoginInformation = (
    encryptedLoginInformation: string,
): LoginRequest | undefined => {
    if (encryptedLoginInformation) {
        const bytes = AES.decrypt(encryptedLoginInformation, LOGIN_HASH_SECRET);
        const convertedText = bytes.toString(enc.Utf8);
        return JSON.parse(convertedText) as LoginRequest;
    }
    return undefined;
};
