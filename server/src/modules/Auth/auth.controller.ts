import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { ApiError, generateApiError } from "src/shared/api/ApiError";
import { ApiSuccess } from "src/shared/api/ApiSuccess";
import { generateErrorCode } from "src/shared/api/ErrorCode";
import { CreateUserDTO } from "src/shared/dto/user/create.user.dto";
import { LoginDto } from "src/shared/dto/user/login.dto";
import { UserService } from "../User/user.service";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
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
    async login(@Body() req: LoginDto): Promise<ApiError | boolean> {
        try {
            const result = this.authService.login(
                req.username,
                req.email,
                req.password,
            );
            return result;
        } catch (error: unknown) {
            return generateApiError(
                HttpStatus.BAD_REQUEST,
                generateErrorCode(6),
            );
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
            return generateApiError(
                HttpStatus.BAD_REQUEST,
                generateErrorCode(0),
            );
        }
    }
}
