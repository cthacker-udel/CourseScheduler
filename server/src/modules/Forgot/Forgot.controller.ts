import { Controller, HttpStatus, Post } from "@nestjs/common";
import { ForgotUsernameRequest } from "src/@types";
import { ERROR_CODES } from "src/ErrorCode";
import { generateApiError } from "src/helpers";
import { UserService } from "src/modules/User/user.service";
import { AuthService } from "../Auth/auth.service";
import { CryptoService } from "../Crypto/crypto.service";

@Controller("forgot")
export class ForgotController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly cryptoService: CryptoService,
    ) {}

    @Post("username")
    async forgotUsername(request: ForgotUsernameRequest) {
        const { email, password } = request;
        const findUserWithEmail = await this.userService.doesEmailExist(email);
        if (!findUserWithEmail) {
            return generateApiError(
                HttpStatus.BAD_REQUEST,
                ERROR_CODES.EMAIL_DOES_NOT_EXIST_ERROR_CODE,
            );
        }
        const passwordValidationDetails =
            await this.userService.getSavedPasswordValidationInfo(email);
        const validationResult = await this.authService.validatePassword(
            passwordValidationDetails.hash,
            passwordValidationDetails.salt,
            passwordValidationDetails.iterations,
            password,
        );

        if (validationResult) {
            const token = await this.cryptoService.generateToken();
            const validUntil = Date.now();
            return { token, validUntil };
        }
        return;
    }
}
