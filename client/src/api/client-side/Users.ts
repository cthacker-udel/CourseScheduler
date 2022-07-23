import type { ApiError, ApiSuccess, SignUpRequest } from "src/@types";

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
    public signUp = async (
        request: SignUpRequest,
    ): Promise<ApiError | ApiSuccess> => {
        const result = await super.post<ApiError | ApiSuccess>(
            "users/signup",
            request,
        );
        return result;
    };
}
