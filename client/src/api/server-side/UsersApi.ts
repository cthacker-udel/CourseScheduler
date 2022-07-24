import type { NextApiResponse } from "next";
import type {
    ApiError,
    ApiSuccess,
    EmailValidationRequest,
    SignUpRequest,
    UsernameValidationRequest,
} from "src/@types";

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
        request: Request,
        response: NextApiResponse,
    ): Promise<void> => {
        const result = await super.post<ApiError | ApiSuccess>(
            "/auth/signup",
            JSON.parse(request.body as unknown as string) as SignUpRequest,
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
        request: Request,
        response: NextApiResponse,
    ): Promise<void> => {
        const result = await super.post<ApiError | ApiSuccess>(
            "/users/email/validate",
            JSON.parse(
                request.body as unknown as string,
            ) as EmailValidationRequest,
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
        request: Request,
        response: NextApiResponse,
    ): Promise<void> => {
        const result = await super.post<ApiError | ApiSuccess>(
            "/users/username/validate",
            JSON.parse(
                request.body as unknown as string,
            ) as UsernameValidationRequest,
        );
        response.json(result);
    };
}
