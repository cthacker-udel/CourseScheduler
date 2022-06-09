import { Injectable } from "@nestjs/common";
import { CryptoService } from "../Crypto/crypto.service";
import { UserService } from "../User/user.service";
import { JwtService } from "@nestjs/jwt";

/**
 * Handles all authentication functions
 */
@Injectable()
export class AuthService {
    /**
     * @param userService DI UserService, for looking up the user in the database
     * @param cryptoService DI CryptoService, for hashing the given password and comparing it to the database's
     */
    constructor(
        private userService: UserService,
        private cryptoService: CryptoService,
        private jwtService: JwtService,
    ) {}

    /**
     * This function validates that a request are valid credentials, and returns the user if so.
     * @param username The username of the user
     * @param password The password of the user
     * @returns The user that is found and matches the given password
     */
    validateUser = async (username: string, password: string) => {
        const user = await this.userService.findOne(username);
        const encodedPassword = await this.cryptoService.encode(password);
        if (user && user.passwordHash === encodedPassword) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars -- result is used, but we strip passwordHash from the object to return the object without the password
            const { passwordHash, ...result } = user;
            return result;
        }
        return null;
    };

    /**
     * This function takes a User database object and returns the object JWT encoded
     * @param user The user object from the database
     * @returns The user object from the database encoded into a JWT
     */
    login = async (user: any) => {
        const payload = { username: user.email, sub: user["_id"] };
        return {
            access_token: this.jwtService.sign(payload),
        };
    };
}
