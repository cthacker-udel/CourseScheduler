import { HttpStatus, Injectable } from "@nestjs/common";
import { ForgotUsernameRequest } from "src/@types";
import { ERROR_CODES } from "src/ErrorCode";
import { generateApiError } from "src/helpers";
import { AuthService } from "../Auth/auth.service";
import { CryptoService } from "../Crypto/crypto.service";
import { UserService } from "../User/user.service";

@Injectable()
export class ForgotService {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly cryptoService: CryptoService,
    ) {}

    forgotUsername = async (request: ForgotUsernameRequest) => {
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
            const validUntil = new Date(Date.now() + 345600000);
            return { token, validUntil };
        }
        return generateApiError(
            HttpStatus.BAD_REQUEST,
            ERROR_CODES.UNKNOWN_SERVER_FAILURE,
        );
    };
}
