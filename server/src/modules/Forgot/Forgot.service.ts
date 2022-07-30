import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import {
    ApiError,
    ForgotEmailRequest,
    ForgotPasswordRequest,
    ForgotTokenResponse,
    ForgotUsernameRequest,
    ValidateEmailTokenRequest,
    ValidatePasswordTokenRequest,
    ValidateTokenResponse,
    ValidateUsernameTokenRequest,
} from "src/@types";
import { User } from "src/entities";
import { ERROR_CODES } from "src/ErrorCode";
import { generateApiError } from "src/helpers";
import { AuthService } from "../Auth/auth.service";
import { CryptoService } from "../Crypto/crypto.service";
import { UserService } from "../User/user.service";

const FOUR_DAYS_MS = 345600000;

type TokenType = "email" | "username" | "password";

@Injectable()
export class ForgotService {
    private readonly logger: Logger;
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly cryptoService: CryptoService,
    ) {}

    forgotUsername = async (
        request: ForgotUsernameRequest,
    ): Promise<ApiError | ForgotTokenResponse> => {
        const { email, password } = request;
        const findUserWithEmail = await this.userService.doesEmailExist(email);
        if (!findUserWithEmail) {
            return generateApiError(
                HttpStatus.BAD_REQUEST,
                ERROR_CODES.EMAIL_DOES_NOT_EXIST,
            );
        }
        const passwordValidationDetails =
            await this.userService.getSavedPasswordValidationInfo(
                undefined,
                email,
            );
        const validationResult = await this.authService.validatePassword(
            passwordValidationDetails.hash,
            passwordValidationDetails.salt,
            passwordValidationDetails.iterations,
            password,
        );

        if (validationResult) {
            const token = this.cryptoService.generateToken();
            const validUntil = new Date(Date.now() + FOUR_DAYS_MS);
            await this.userService.addResetToken(
                { email },
                token,
                "username",
                validUntil,
            );
            return { token, validUntil };
        }
        return generateApiError(
            HttpStatus.BAD_REQUEST,
            ERROR_CODES.UNKNOWN_SERVER_FAILURE,
        );
    };

    forgotPassword = async (
        request: ForgotPasswordRequest,
    ): Promise<ApiError | ForgotTokenResponse> => {
        const { email, username } = request;
        if (
            this.userService.doesUsernameExist(username) &&
            this.userService.doesEmailExist(email)
        ) {
            const token = await this.cryptoService.generateToken();
            const validUntil = new Date(Date.now() + FOUR_DAYS_MS);
            await this.userService.addResetToken(
                { email, username },
                token,
                "password",
                validUntil,
            );
            return { token, validUntil };
        }
        return generateApiError(
            HttpStatus.BAD_REQUEST,
            ERROR_CODES.UNKNOWN_SERVER_FAILURE,
        );
    };

    forgotEmail = async (
        request: ForgotEmailRequest,
    ): Promise<ApiError | ForgotTokenResponse> => {
        const { password, username } = request;
        if (this.userService.doesUsernameExist(username)) {
            const passwordValidationDetails =
                await this.userService.getSavedPasswordValidationInfo(username);
            const validationResult = await this.authService.validatePassword(
                passwordValidationDetails.hash,
                passwordValidationDetails.salt,
                passwordValidationDetails.iterations,
                password,
            );
            if (validationResult) {
                const token = this.cryptoService.generateToken();
                const validUntil = new Date(Date.now() + FOUR_DAYS_MS);
                await this.userService.addResetToken(
                    { username },
                    token,
                    "email",
                    validUntil,
                );
                return { token, validUntil };
            }
            return generateApiError(
                HttpStatus.BAD_REQUEST,
                ERROR_CODES.PASSWORD_INVALID,
            );
        }
        return generateApiError(
            HttpStatus.BAD_REQUEST,
            ERROR_CODES.USER_DOES_NOT_EXIST,
        );
    };

    validateToken = async (
        user: User,
        token: string,
        type: TokenType,
    ): Promise<boolean> => {
        switch (type) {
            case "email": {
                return (
                    user.resetToken.email.token === token &&
                    new Date(user.resetToken.email.validUntil).getTime() >=
                        Date.now()
                );
            }
            case "username": {
                return (
                    user.resetToken.username.token === token &&
                    new Date(user.resetToken.username.validUntil).getTime() >=
                        Date.now()
                );
            }
            case "password": {
                return (
                    user.resetToken.password.token === token &&
                    new Date(user.resetToken.password.validUntil).getTime() >=
                        Date.now()
                );
            }
            default: {
                return false;
            }
        }
    };

    validateUsernameToken = async (
        request: ValidateUsernameTokenRequest,
    ): Promise<ValidateTokenResponse> => {
        const { email, password, token } = request;
        if (await this.userService.doesEmailExist(email)) {
            const passwordDetails =
                await this.userService.getSavedPasswordValidationInfo(
                    undefined,
                    email,
                );
            const isPasswordValid = await this.cryptoService.validatePassword(
                password,
                passwordDetails.hash,
                passwordDetails.salt,
                passwordDetails.iterations,
            );
            if (isPasswordValid) {
                const accepted = await this.validateToken(
                    await this.userService.findUserByEmail(request.email),
                    token,
                    "username",
                );
                Logger.log(`Token ${accepted ? "accepted" : "denied"}`);
                return {
                    accepted,
                };
            }
            Logger.log("Token denied");
            return { accepted: false };
        }
        Logger.log("Token denied");
        return { accepted: false };
    };

    validateEmailToken = async (
        request: ValidateEmailTokenRequest,
    ): Promise<ValidateTokenResponse> => {
        const { password, username, token } = request;
        if (await this.userService.doesUsernameExist(username)) {
            const passwordDetails =
                await this.userService.getSavedPasswordValidationInfo(
                    username,
                    undefined,
                );
            const isPasswordValid = await this.cryptoService.validatePassword(
                password,
                passwordDetails.hash,
                passwordDetails.salt,
                passwordDetails.iterations,
            );
            if (isPasswordValid) {
                const accepted = await this.validateToken(
                    await this.userService.findUserByUsername(request.username),
                    token,
                    "email",
                );
                Logger.log(`Token ${accepted ? "accepted" : "denied"}`);
                return {
                    accepted,
                };
            }
            Logger.log("Token denied");
            return { accepted: false };
        }
        Logger.log("Token denied");
        return { accepted: false };
    };

    validatePasswordToken = async (
        request: ValidatePasswordTokenRequest,
    ): Promise<ValidateTokenResponse> => {
        const { email, username, token } = request;
        if (await this.userService.doesUsernameExist(username)) {
            if (await this.userService.doesEmailExist(email)) {
                const userEmail = await this.userService.findUserByEmail(email);
                let accepted;
                if (userEmail) {
                    accepted = await this.validateToken(
                        userEmail,
                        token,
                        "password",
                    );
                    Logger.log(`Token ${accepted ? "accepted" : "denied"}`);
                    return {
                        accepted,
                    };
                }
                const userUsername = await this.userService.findUserByUsername(
                    username,
                );
                if (userUsername) {
                    accepted = await this.validateToken(
                        userUsername,
                        token,
                        "password",
                    );
                    Logger.log(`Token ${accepted ? "accepted" : "denied"}`);
                    return {
                        accepted,
                    };
                }
                Logger.log("Token denied");
                return { accepted: false };
            }
            Logger.log("Token denied");
            return { accepted: false };
        }
        Logger.log("Token denied");
        return { accepted: false };
    };
}
