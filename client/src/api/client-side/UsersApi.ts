import type {
    ApiError,
    ApiSuccess,
    EmailValidationRequest,
    SignUpRequest,
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
}
