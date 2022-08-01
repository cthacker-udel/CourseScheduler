import type {
    ApiError,
    ApiSuccess,
    EmailValidationRequest,
    ForgotEmailRequest,
    ForgotPasswordRequest,
    ForgotTokenUsernameRedeemRequest,
    ForgotTokenUsernameRequest,
    ForgotUsernameRequest,
    LoginRequest,
    LoginResponse,
    SignUpRequest,
    TokenRedeemResponse,
    TokenResponse,
    TokenValidationResponse,
    UsernameValidationRequest,
} from "src/@types";

import { ClientSideApi } from "./ClientSideApi";

/**
 * Users client-side api
 */
export class UsersApi extends ClientSideApi {
    /**
     * Represents the sign up request, which does not require authentication
     *
     * @param request The user sent request to sign up
     * @returns An api error or an api success
     */
    public static signUp = async (
        request: SignUpRequest,
    ): Promise<ApiError | ApiSuccess> => {
        const result = await super.post<ApiError | ApiSuccess>(
            "/users/signup",
            request,
        );
        return result;
    };

    /**
     * Represents the log in request, which requires a level of authentication, which is handled in the backend
     *
     * @param request The user sent request which contains their email, password, and username
     * @returns The user's token, and whether they can login or not
     */
    public static login = async (
        request: LoginRequest,
    ): Promise<LoginResponse> => {
        const result = await super.post<LoginResponse>("/users/login", request);
        return result;
    };

    /**
     * Represents an email validation action, which checks if the email already exists in the database
     *
     * @param request The email the user sent to validate
     * @returns An api error or an api success if the email is present in the database
     */
    public static checkEmail = async (
        request: EmailValidationRequest,
    ): Promise<ApiError | ApiSuccess> => {
        const result = await super.post<ApiError | ApiSuccess>(
            "/users/email/validate",
            request,
        );
        return result;
    };

    /**
     * Represents an username validation action, which checks if the username already exists in the database
     *
     * @param request The username the user sent to validate
     * @returns An api error or an api success if the username is present in the database
     */
    public static checkUsername = async (
        request: UsernameValidationRequest,
    ): Promise<ApiError | ApiSuccess> => {
        const result = await super.post<ApiError | ApiSuccess>(
            "/users/username/validate",
            request,
        );
        return result;
    };

    /**
     * Represents an forgot username flow, returns a token for the user to utilize when authenticating
     *
     * @param request The request, contains the email and the password
     * @returns The api result, could either be a valid token or an empty string
     */
    public static forgotUsername = async (
        request: ForgotUsernameRequest,
    ): Promise<TokenResponse> => {
        const result = await super.post<TokenResponse>(
            "/forgot/username",
            request,
        );
        return result;
    };

    /**
     * Represents an forgot password flow, returns a token for the user to utilize when authenticating
     *
     * @param request The request, contains email and username
     * @returns The api result, could either be an valid token or an empty string
     */
    public static forgotPassword = async (
        request: ForgotPasswordRequest,
    ): Promise<TokenResponse> => {
        const result = await super.post<TokenResponse>(
            "/forgot/password",
            request,
        );
        return result;
    };

    /**
     * Represents an forgot email flow, returns a token for the user to utilize when authenticating
     *
     * @param request The request, contains email and username
     * @returns The api result, could either be an valid token or an empty string
     */
    public static forgotEmail = async (
        request: ForgotEmailRequest,
    ): Promise<TokenResponse> => {
        const result = await super.post<TokenResponse>(
            "/forgot/email",
            request,
        );
        return result;
    };

    /**
     * Represents an forgot username token redemption flow for the user to validate their token before committing the edit
     *
     * @param request The request, contains email and password
     * @returns The api result, could either be the token is accepted or not
     */
    public static validateUsernameToken = async (
        request: ForgotTokenUsernameRequest,
    ): Promise<TokenValidationResponse> => {
        const result = await super.post<TokenValidationResponse>(
            "/forgot/username/validate",
            request,
        );
        return result;
    };

    /**
     * Represents an change username request, which is the result of the token request
     *
     * @param request The request to change the user's username
     * @returns Whether the change was successful or not
     */
    public static changeUsernameByToken = async (
        request: ForgotTokenUsernameRedeemRequest,
    ): Promise<TokenRedeemResponse> => {
        const result = await super.post<TokenRedeemResponse>(
            "/forgot/username/redeem",
            request,
        );
        return result;
    };
}
