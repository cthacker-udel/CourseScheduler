import { HttpStatus, Injectable } from "@nestjs/common";
import {
    ApiError,
    ForgotPasswordRequest,
    ForgotTokenResponse,
    ForgotUsernameRequest,
} from "src/@types";
import { ERROR_CODES } from "src/ErrorCode";
import { generateApiError } from "src/helpers";
import { AuthService } from "../Auth/auth.service";
import { CryptoService } from "../Crypto/crypto.service";
import { UserService } from "../User/user.service";

const FOUR_DAYS_MS = 345600000;

@Injectable()
export class ForgotService {
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
        }
        return generateApiError(
            HttpStatus.BAD_REQUEST,
            ERROR_CODES.UNKNOWN_SERVER_FAILURE,
        );
    };
}
