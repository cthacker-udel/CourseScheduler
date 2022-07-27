import { Injectable } from "@nestjs/common";
import { SECRETS } from "config";
import { randomInt, randomBytes, pbkdf2Sync, createHmac } from "crypto";

/**
 * Represents the result of the encoding operation
 */
export interface EncodingResult {
    salt: string;
    hash: string;
    iterations: number;
}

/**
 * CryptoService, providing an encode method used to encode data in password-based key-derivation algorithm
 */
@Injectable()
export class CryptoService {
    /**
     * This method is used to encode a given message in password-based key-derivation algorithm
     * @param message The message to encode with the secret
     * @returns The encoded message
     */
    encode = async (message: string): Promise<EncodingResult> => {
        const salt = randomBytes(128).toString("base64");
        const iterations = randomInt(1000, 10000);
        const hash = pbkdf2Sync(
            message,
            salt,
            iterations,
            512,
            "sha256",
        ).toString("hex");
        return {
            salt,
            hash,
            iterations,
        };
    };

    /**
     * Validates the password entered matches the database
     * @param enteredPassword The entered password from the front-end
     * @param savedPassword The saved password from the backend
     * @param savedSalt The saved salt from the backend
     * @returns Whether the entered password is a valid password
     */
    validatePassword = async (
        enteredPassword: string,
        savedPassword: string,
        savedSalt: string,
        savedIterations: number,
    ): Promise<boolean> => {
        const hash = pbkdf2Sync(
            enteredPassword,
            savedSalt,
            savedIterations,
            512,
            "sha256",
        ).toString("hex");
        return hash === savedPassword;
    };

    /**
     * Utility function for generating a `amt` byte random token for the user to use as their session token (if `amt` not specified, 256)
     *
     * @param amt The # of bytes the token should be
     * @returns The randomly generated token, which serves as a session token
     */
    generateToken = (amt?: number) => {
        const hash = createHmac("sha512", SECRETS.SECRET)
            .update(randomBytes(amt ?? 256).toString("hex"))
            .digest("hex");
        return hash;
    };
}
