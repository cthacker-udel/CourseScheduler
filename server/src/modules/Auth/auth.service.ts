import { HttpStatus, Injectable } from "@nestjs/common";
import { CryptoService } from "../Crypto/crypto.service";
import { UserService } from "../User/user.service";
import { ApiError, generateApiError } from "src/@types/api/ApiError";
import { generateErrorCode } from "src/@types/api/ErrorCode";
import { ApiSuccess, generateApiSuccess } from "src/@types/api/ApiSuccess";
import { CreateUserDTO } from "src/dto/user/create.user.dto";

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
    ) {}

    /**
     * This function validates that a request are valid credentials, and returns the user if so.
     * @param username The username of the user
     * @param password The password of the user
     * @returns The user that is found and matches the given password
     */
    validatePassword = async (
        savedPassword: string,
        savedSalt: string,
        savedIterations: number,
        enteredPassword: string,
    ) => {
        return this.cryptoService.validatePassword(
            enteredPassword,
            savedPassword,
            savedSalt,
            savedIterations,
        );
    };

    /**
     * This function takes in the user input and returns a boolean if successful or an ApiError if unsuccessful
     * @param username The username supplied via front-end
     * @param email The email supplied via front-end
     * @param enteredPassword The entered password in the login form
     * @returns Whether the user can login, if not, an ApiError specifying details of why the login failed
     */
    login = async (
        username: string,
        email: string,
        enteredPassword: string,
    ): Promise<ApiError | boolean> => {
        if (this.userService.doesUsernameExist(username)) {
            if (this.userService.doesEmailExist(email)) {
                const storedPasswordDetails =
                    await this.userService.getSavedPasswordValidationInfo(
                        username,
                        email,
                    );
                const passwordValidationResult = await this.validatePassword(
                    storedPasswordDetails.hash,
                    storedPasswordDetails.salt,
                    storedPasswordDetails.iterations,
                    enteredPassword,
                );
                if (!passwordValidationResult) {
                    console.error("Password invalid");
                    return generateApiError(
                        HttpStatus.BAD_REQUEST,
                        generateErrorCode(5),
                    );
                }
                return true;
            } else {
                console.error("Login failed: Email does not exist");
                return generateApiError(
                    HttpStatus.BAD_REQUEST,
                    generateErrorCode(2),
                );
            }
        } else {
            console.error("Login failed: User does not exist");
            return generateApiError(
                HttpStatus.BAD_REQUEST,
                generateErrorCode(1),
            );
        }
    };

    createUser = async (
        request: CreateUserDTO,
    ): Promise<ApiError | ApiSuccess> => {
        if (!this.userService.doesUsernameExist(request.username)) {
            if (!this.userService.doesEmailExist(request.email)) {
                await this.userService.create(request);
                return generateApiSuccess(HttpStatus.OK, { canLogin: true });
            } else {
                return generateApiError(
                    HttpStatus.BAD_REQUEST,
                    generateErrorCode(2),
                );
            }
        } else {
            return generateApiError(
                HttpStatus.BAD_REQUEST,
                generateErrorCode(1),
            );
        }
    };
}
