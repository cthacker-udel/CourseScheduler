import type {
    AddPlanRequest,
    ApiError,
    ApiSuccess,
    SessionToken,
} from "src/@types";
import { decryptLoginInformation } from "src/config/encryption/decryptLoginInformation";
import { SESSION_TOKEN_KEY } from "src/config/encryption/keys";

import { ClientSideApi } from "./ClientSideApi";

/**
 * Client-side plans api, which houses all the client-side logic for constructing a request to the server-side for communication with the database
 */
export class PlansApi extends ClientSideApi {
    public static BASE_URL = "/plan/";

    /**
     * Client-side request to create a plan
     *
     * @param request - Client-side add plan request, the actual data we are passing to the server-side via body within request is this
     * @returns - Whether the operation was a success or failure
     */
    public static addPlan = async (
        request: AddPlanRequest,
    ): Promise<ApiError | ApiSuccess> => {
        const storedSession = localStorage.getItem(SESSION_TOKEN_KEY);
        let username = "";
        if (storedSession) {
            const castedSession = JSON.parse(storedSession) as SessionToken;
            const decryptedSession = decryptLoginInformation(
                castedSession.session,
            );
            if (decryptedSession) {
                username = decryptedSession.username;
            }
        }
        const result = await super.post<ApiError | ApiSuccess>(
            `${this.BASE_URL}add`,
            { ...request, username },
        );
        return result;
    };
}
