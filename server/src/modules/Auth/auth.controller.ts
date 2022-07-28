import { Body, Controller, HttpStatus, Logger, Post } from "@nestjs/common";
import { ApiError, ApiSuccess, LoginResponse } from "src/@types";
import { CreateUserDTO } from "src/dto/user/create.user.dto";
import { LoginDto } from "src/dto/user/login.dto";
import { ERROR_CODES } from "src/ErrorCode";
import { generateApiError, generateLoginResponse } from "src/helpers";
import { UserService } from "../User/user.service";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
    private readonly logger = new Logger(AuthController.name);
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    /**
     * Checks if the user can login, depending on whether email, username, and password are valid
     * @param req The LoginDto request, containing the entered email, username, and password
     * @returns Whether the user can login or not
     */
    @Post("auth/login")
    async login(@Body() req: LoginDto): Promise<LoginResponse> {
        try {
            const result = this.authService.login(
                req.username,
                req.email,
                req.password,
            );
            return result;
        } catch (error: unknown) {
            this.logger.error(`Login failed - ${error}`);
            return generateLoginResponse(false);
        }
    }

    /**
     * Takes in the necessary fields for a successful creation of user, and responds with an ApiError if failed, or boolean if successful
     * @param body The necessary fields to create a user in the database
     * @returns Status indicating the request was successful
     */
    @Post("auth/signup")
    async signUp(@Body() body: CreateUserDTO): Promise<ApiSuccess | ApiError> {
        try {
            return await this.authService.createUser(body);
        } catch (error: unknown) {
            this.logger.error(`Sign Up failed - ${error}`);
            return generateApiError(
                HttpStatus.BAD_REQUEST,
                ERROR_CODES.UNKNOWN_SERVER_FAILURE,
            );
        }
    }
}
