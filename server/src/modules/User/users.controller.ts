import { Body, Controller, HttpStatus, Logger, Post } from "@nestjs/common";
import { EmailValidationDTO } from "src/dto/user/emailValidation.dto";
import { UsernameValidationDTO } from "src/dto/user/usernameValidation.dto";
import { ERROR_CODES } from "src/ErrorCode";
import { generateApiError, generateApiSuccess } from "src/helpers";
import { UserService } from "./user.service";

@Controller()
export class UserController {
    /**
     * Logger instance
     */
    private readonly logger = new Logger(UserController.name);
    /**
     * @constructor
     * One arg constructor, used for acquiring the DI user service
     *
     * @param usersService DI injected user service
     */
    constructor(private readonly usersService: UserService) {}

    @Post("users/username/validate")
    async validateUsername(@Body() req: UsernameValidationDTO) {
        try {
            const doesUsernameExist = await this.usersService.doesUsernameExist(
                req.username,
            );
            this.logger.log(
                `Username Validation on ${req.username}: ${doesUsernameExist}`,
            );
            return generateApiSuccess(
                doesUsernameExist ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
            );
        } catch (error: unknown) {
            this.logger.error(error);
            return generateApiError(
                HttpStatus.BAD_REQUEST,
                ERROR_CODES.UNKNOWN_SERVER_FAILURE_ERROR_CODE,
            );
        }
    }

    @Post("users/email/validate")
    async validateEmail(@Body() req: EmailValidationDTO) {
        try {
            const doesEmailExist = await this.usersService.doesEmailExist(
                req.email,
            );
            this.logger.log(
                `Email Validation on ${req.email}: ${doesEmailExist}`,
            );
            return generateApiSuccess(
                doesEmailExist ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
            );
        } catch (error: unknown) {
            this.logger.error(error);
            return generateApiError(
                HttpStatus.BAD_REQUEST,
                ERROR_CODES.UNKNOWN_SERVER_FAILURE_ERROR_CODE,
            );
        }
    }
}
