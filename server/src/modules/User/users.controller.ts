import { Body, Controller, HttpStatus, Logger, Post } from "@nestjs/common";
import { ERROR_CODES } from "src/@types";
import { EmailValidationDTO } from "src/dto/user/emailValidation.dto";
import { UsernameValidationDTO } from "src/dto/user/usernameValidation.dto";
import { generateApiError, generateErrorCode } from "src/helpers";
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
            return doesUsernameExist;
        } catch (error: unknown) {
            this.logger.error(error);
            return generateApiError(
                HttpStatus.BAD_REQUEST,
                generateErrorCode(ERROR_CODES.UNKNOWN_SERVER_FAILURE),
            );
        }
    }

    @Post("users/email/validate")
    async validateEmail(@Body() req: EmailValidationDTO) {
        this.logger.log("Request = ", req);
        try {
            const doesEmailExist = await this.usersService.doesEmailExist(
                req.email,
            );
            this.logger.log(
                `Email Validation on ${req.email}: ${doesEmailExist}`,
            );
            return doesEmailExist;
        } catch (error: unknown) {
            this.logger.error(error);
            return generateApiError(
                HttpStatus.BAD_REQUEST,
                generateErrorCode(ERROR_CODES.UNKNOWN_SERVER_FAILURE),
            );
        }
    }
}
