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
    public static signUp = async (
        request: Request,
    ): Promise<ApiError | ApiSuccess> => {
        const result = await super.post<ApiError | ApiSuccess>(
            "/auth/signup",
            JSON.parse(request.body as unknown as string) as SignUpRequest,
        );
        console.log("result = ", result);
        return result;
    };
}
