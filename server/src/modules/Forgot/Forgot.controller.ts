import { Body, Controller, HttpStatus, Logger, Post } from "@nestjs/common";
import {
    ApiError,
    ForgotUsernameRequest,
    ForgotTokenResponse,
    ForgotPasswordRequest,
    ForgotEmailRequest,
    ValidateUsernameTokenRequest,
    ValidateEmailTokenRequest,
    ValidatePasswordTokenRequest,
    ValidateTokenResponse,
    RedeemUsernameToken,
    RedeemEmailToken,
    RedeemPasswordToken,
} from "src/@types";
import { RedeemTokenResponse } from "src/@types/Forgot/RedeemToken/RedeemTokenResponse";
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
            Logger.error(error, (error as Error).stack);
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
            Logger.error(error, (error as Error).stack);
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
            Logger.error(error, (error as Error).stack);
            return generateApiError(
                HttpStatus.SERVICE_UNAVAILABLE,
                ERROR_CODES.UNKNOWN_SERVER_FAILURE,
            );
        }
    }

    @Post("token/validate/username")
    async validateUsernameToken(
        @Body() request: ValidateUsernameTokenRequest,
    ): Promise<ValidateTokenResponse> {
        try {
            return await this.forgotService.validateUsernameToken(request);
        } catch (error: unknown) {
            Logger.error(error, (error as Error).stack);
            return { accepted: false };
        }
    }

    @Post("token/validate/email")
    async validateEmailToken(
        @Body() request: ValidateEmailTokenRequest,
    ): Promise<ValidateTokenResponse> {
        try {
            return await this.forgotService.validateEmailToken(request);
        } catch (error: unknown) {
            Logger.error(error, (error as Error).stack);
            return { accepted: false };
        }
    }

    @Post("token/validate/password")
    async validatePasswordToken(
        @Body() request: ValidatePasswordTokenRequest,
    ): Promise<ValidateTokenResponse> {
        try {
            return await this.forgotService.validatePasswordToken(request);
        } catch (error: unknown) {
            Logger.error(error, (error as Error).stack);
            return { accepted: false };
        }
    }

    @Post("token/username/redeem")
    async redeemUsernameToken(
        @Body() request: RedeemUsernameToken,
    ): Promise<RedeemTokenResponse> {
        try {
            return await this.forgotService.redeemUsernameToken(request);
        } catch (error: unknown) {
            Logger.error(error, (error as Error).stack);
            return { changed: false };
        }
    }

    @Post("token/email/redeem")
    async redeemEmailToken(
        @Body() request: RedeemEmailToken,
    ): Promise<RedeemTokenResponse> {
        try {
            return await this.forgotService.redeemEmailToken(request);
        } catch (error: unknown) {
            Logger.error(error, (error as Error).stack);
            return { changed: false };
        }
    }

    @Post("token/password/redeem")
    async redeemPasswordToken(
        @Body() request: RedeemPasswordToken,
    ): Promise<RedeemTokenResponse> {
        try {
            return await this.forgotService.redeemPasswordToken(request);
        } catch (error: unknown) {
            Logger.error(error, (error as Error).stack);
            return { changed: false };
        }
    }
}
