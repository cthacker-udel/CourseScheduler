import type { NextApiRequest, NextApiResponse } from "next";
import type {
    ApiError,
    ApiSuccess,
    EmailValidationRequest,
    ForgotEmailRequest,
    ForgotPasswordRequest,
    ForgotTokenEmailRedeemRequest,
    ForgotTokenUsernameRedeemRequest,
    ForgotTokenUsernameRequest,
    ForgotUsernameRequest,
    LoginResponse,
    SignUpRequest,
    TokenRedeemResponse,
    TokenResponse,
    TokenValidationResponse,
    UsernameValidationRequest,
} from "src/@types";

// TODO: Implement the forgot username flow in the backend
import { ServerSideApi } from "./ServerSideApi";

/**
 * The Users API that calls the server from the request
 */
export class UsersApi extends ServerSideApi {
    /**
     * Sign up action, adds a user to the database
     *
     * @param request The sign up request, appended into the body of the request
     * @returns
     */
    public static signUp = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        const result = await super.post<ApiError | ApiSuccess>(
            "/auth/signup",
            JSON.parse(request.body) as SignUpRequest,
        );
        response.json(result);
    };

    /**
     * Log in action, logs a user into the system
     *
     * @param request The request coming from the serverless api
     * @param response The formatted response to send back to the user
     */
    public static login = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        const result = await super.post<LoginResponse>(
            "/auth/login",
            JSON.parse(request.body),
        );
        response.json(result);
    };

    /**
     * Represents an email validation action, which checks if the email already exists in the database
     *
     * @param request The email the user sent to validate
     * @returns An api error or an api success if the email is present in the database
     */
    public static checkEmail = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        const result = await super.post<ApiError | ApiSuccess>(
            "/users/email/validate",
            JSON.parse(request.body) as EmailValidationRequest,
        );
        response.json(result);
    };

    /**
     * Represents an username validation action, which checks if the username already exists in the database
     *
     * @param request The username the user sent to validate
     * @returns An api error or an api success if the username is present in the database
     */
    public static checkUsername = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        const result = await super.post<ApiError | ApiSuccess>(
            "/users/username/validate",
            JSON.parse(request.body) as UsernameValidationRequest,
        );
        response.json(result);
    };

    /**
     * Server-side forgot username flow
     *
     * @param request The request containing in the body the full ForgotUsernameRequest type
     * @param response The next/api response
     */
    public static forgotUsername = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        const result = await super.post<TokenResponse>(
            "/forgot/username",
            JSON.parse(request.body) as ForgotUsernameRequest,
        );
        response.json(result);
    };

    /**
     * Server-side forgot password flow
     *
     * @param request The request containing in the body the full ForgotPasswordRequest type
     * @param response The next/api response
     */
    public static forgotPassword = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        const result = await super.post<TokenResponse>(
            "/forgot/password",
            JSON.parse(request.body) as ForgotPasswordRequest,
        );
        response.json(result);
    };

    /**
     * Server-side forgot email flow
     *
     * @param request The request containing the username and password in the body
     * @param response The next/api response
     */
    public static forgotEmail = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        const result = await super.post<TokenResponse>(
            "/forgot/email",
            JSON.parse(request.body) as ForgotEmailRequest,
        );
        response.json(result);
    };

    /**
     * Server-side username token validation flow
     *
     * @param request The request containing the email and password in the body
     * @param response The next/api response
     */
    public static validateUsernameToken = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        const result = await super.post<TokenValidationResponse>(
            "/forgot/token/validate/username",
            JSON.parse(request.body) as ForgotTokenUsernameRequest,
        );
        response.json(result);
    };

    /**
     * Server-side email token validation flow
     *
     * @param request The request containing the username and password in the body
     * @param response The next/api response
     */
    public static validateEmailToken = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        const result = await super.post<TokenValidationResponse>(
            "/forgot/token/validate/email",
            JSON.parse(request.body) as ForgotTokenUsernameRequest,
        );
        response.json(result);
    };

    /**
     * Server-side password token validation flow
     *
     * @param request The request containing the username and email in the body
     * @param response The next/api response
     */
    public static validatePasswordToken = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        const result = await super.post<TokenValidationResponse>(
            "/forgot/token/validate/password",
            JSON.parse(request.body) as ForgotTokenUsernameRequest,
        );
        response.json(result);
    };

    /**
     * Server-side username change token request flow
     *
     * @param request The request containing the email, password, and token in the body
     * @param response The next/api response
     */
    public static changeUsername = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        const result = await super.post<TokenRedeemResponse>(
            "/forgot/token/username/redeem",
            JSON.parse(request.body) as ForgotTokenUsernameRedeemRequest,
        );
        response.json(result);
    };

    /**
     * Server-side email change token request flow
     *
     * @param request The request containing the username, password, and token in the body
     * @param response The next/api response
     */
    public static changeEmail = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        const result = await super.post<TokenRedeemResponse>(
            "/forgot/token/username/redeem",
            JSON.parse(request.body) as ForgotTokenEmailRedeemRequest,
        );
        response.json(result);
    };

    /**
     * Server-side email change token request flow
     *
     * @param request The request containing the username, password, and token in the body
     * @param response The next/api response
     */
    public static changePassword = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        const result = await super.post<TokenRedeemResponse>(
            "/forgot/token/username/redeem",
            JSON.parse(request.body) as ForgotTokenEmailRedeemRequest,
        );
        response.json(result);
    };
}
