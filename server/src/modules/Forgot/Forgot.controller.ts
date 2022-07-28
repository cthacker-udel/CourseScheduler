import { Body, Controller, HttpStatus, Logger, Post } from "@nestjs/common";
import {
    ApiError,
    ForgotUsernameRequest,
    ForgotTokenResponse,
    ForgotPasswordRequest,
    ForgotEmailRequest,
} from "src/@types";
import { ERROR_CODES } from "src/ErrorCode";
import { generateApiError } from "src/helpers";
import { ForgotService } from "./Forgot.service";

@Controller("forgot")
export class ForgotController {
    private readonly logger: Logger;
    constructor(private readonly forgotService: ForgotService) {}

    @Post("username")
    async forgotUsername(
        @Body() request: ForgotUsernameRequest,
    ): Promise<ApiError | ForgotTokenResponse> {
        try {
            return await this.forgotService.forgotUsername(request);
        } catch (error: unknown) {
            Logger.error(error);
            return generateApiError(
                HttpStatus.SERVICE_UNAVAILABLE,
                ERROR_CODES.UNKNOWN_SERVER_FAILURE,
            );
        }
    }

    @Post("password")
    async forgotPassword(
        @Body() request: ForgotPasswordRequest,
    ): Promise<ApiError | ForgotTokenResponse> {
        try {
            return await this.forgotService.forgotPassword(request);
        } catch (error: unknown) {
            Logger.error(error);
            return generateApiError(
                HttpStatus.SERVICE_UNAVAILABLE,
                ERROR_CODES.UNKNOWN_SERVER_FAILURE,
            );
        }
    }

    @Post("email")
    async forgotEmail(
        @Body() request: ForgotEmailRequest,
    ): Promise<ApiError | ForgotTokenResponse> {
        try {
            return await this.forgotService.forgotEmail(request);
        } catch (error: unknown) {
            Logger.error(error);
            return generateApiError(
                HttpStatus.SERVICE_UNAVAILABLE,
                ERROR_CODES.UNKNOWN_SERVER_FAILURE,
            );
        }
    }
}
