import type { ApiError, ApiSuccess, SignUpRequest } from "src/@types";

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
    public signUp = async (
        request: SignUpRequest,
    ): Promise<ApiError | ApiSuccess> => {
        const result = await super.post<ApiError | ApiSuccess>(
            "auth/signup",
            request,
        );
        return result;
    };
}
