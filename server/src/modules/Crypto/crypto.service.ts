import { Injectable } from "@nestjs/common";
import { createHmac } from "crypto";
import config from "config/config";

/**
 * CryptoService, providing an encode method used to encode data in hmacsha256
 */
@Injectable()
export class CryptoService {
    /**
     * This method is used to encode a given message in hmacsha256 algorithm and return the encoded result in hex
     * @param message The message to encode with the secret
     * @returns {string} The encoded message
     */
    encode = async (message: string) => {
        return createHmac("sha256", config.SECRET)
            .update(message)
            .digest("hex");
    };
}
