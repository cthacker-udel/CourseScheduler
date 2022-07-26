import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { CryptoService } from "../Crypto/crypto.service";
import { UserService } from "../User/user.service";
import { CreateUserDTO } from "src/dto/user/create.user.dto";
import { ApiError, ApiSuccess, LoginResponse } from "src/@types";
import {
    generateApiError,
    generateApiSuccess,
    generateLoginResponse,
} from "src/helpers";
import { ERROR_CODES } from "src/ErrorCode";

/**
 * Handles all authentication functions
 */
@Injectable()
export class AuthService {
    /**
     * DI injected logger
     */
    private readonly logger = new Logger(AuthService.name);
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
    ): Promise<LoginResponse> => {
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
                    this.logger.error(
                        `(${email},${username}) Login failed - Password Invalid`,
                    );
                    return generateLoginResponse(false);
                }
                const token = this.cryptoService.generateToken();
                return generateLoginResponse(passwordValidationResult, token);
            } else {
                this.logger.error(
                    `(${email},${username}) Login failed  - Email Does Not Exist`,
                );
                return generateLoginResponse(false);
            }
        } else {
            this.logger.error(
                `(${email},${username}) Login failed - Username Does Not Exist`,
            );
            return generateLoginResponse(false);
        }
    };

    createUser = async (
        request: CreateUserDTO,
    ): Promise<ApiError | ApiSuccess> => {
        const doesUsernameExist = await this.userService.doesUsernameExist(
            request.username,
        );
        if (!doesUsernameExist) {
            const doesEmailExist = await this.userService.doesEmailExist(
                request.email,
            );
            if (!doesEmailExist) {
                await this.userService.create(request);
                return generateApiSuccess(HttpStatus.OK, { canLogin: true });
            } else {
                return generateApiError(
                    HttpStatus.BAD_REQUEST,
                    ERROR_CODES.EMAIL_ALREADY_EXISTS,
                );
            }
        } else {
            return generateApiError(
                HttpStatus.BAD_REQUEST,
                ERROR_CODES.USER_ALREADY_EXISTS,
            );
        }
    };
}
