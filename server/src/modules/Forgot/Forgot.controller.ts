import { Controller, HttpStatus, Post } from "@nestjs/common";
import {
    ApiError,
    ForgotUsernameRequest,
    ForgotUsernameResponse,
} from "src/@types";
import { ERROR_CODES } from "src/ErrorCode";
import { generateApiError } from "src/helpers";
import { ForgotService } from "./Forgot.service";

@Controller("forgot")
export class ForgotController {
    constructor(private readonly forgotService: ForgotService) {}

    @Post("username")
    async forgotUsername(
        request: ForgotUsernameRequest,
    ): Promise<ApiError | ForgotUsernameResponse> {
        try {
            return await this.forgotService.forgotUsername(request);
        } catch (error: unknown) {
            return generateApiError(
                HttpStatus.SERVICE_UNAVAILABLE,
                ERROR_CODES.UNKNOWN_SERVER_FAILURE,
            );
        }
    }
}
