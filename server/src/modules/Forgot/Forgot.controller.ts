import { Controller, HttpStatus, Post } from "@nestjs/common";
import { ERROR_CODES, ForgotUsernameRequest } from "src/@types";
import { generateApiError } from "src/helpers";
import { UserService } from "src/modules/User/user.service";

@Controller("forgot")
export class ForgotController {
    constructor(private readonly userService: UserService) {}

    @Post("username")
    async forgotUsername(request: ForgotUsernameRequest) {
        const findUserWithEmail = await this.userService.doesEmailExist(
            request.email,
        );
        if (!findUserWithEmail) {
            return generateApiError(
                HttpStatus.BAD_REQUEST,
                ERROR_CODES.EMAIL_DOES_NOT_EXIST_ERROR_CODE,
            );
        }
    }
}
