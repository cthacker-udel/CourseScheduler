import { Injectable } from "@nestjs/common";
import { randomInt, randomBytes, pbkdf2, pbkdf2Sync } from "crypto";

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
        let hash;
        await pbkdf2(
            enteredPassword,
            savedSalt,
            savedIterations,
            512,
            "sha256",
            (err, derivedKey) => {
                if (!err) {
                    hash = derivedKey.toString("hex");
                } else {
                    throw err;
                }
            },
        );
        return hash === savedPassword;
    };
}
