import type {
    AddPlanRequest,
    ApiError,
    ApiSuccess,
    ServerSidePlan,
    SessionToken,
} from "src/@types";
import { decryptLoginInformation } from "src/config/encryption/decryptLoginInformation";
import { SESSION_TOKEN_KEY } from "src/config/encryption/keys";
import { Logger } from "src/log/Logger";

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
    ): Promise<ApiError | ApiSuccess | undefined> => {
        try {
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
        } catch (error: unknown) {
            Logger.log(
                "error",
                `Failed to add plan with name ${request.name} and error ${
                    (error as Error).message
                }`,
            );
            return undefined;
        }
    };

    /**
     * Gets all plans with the specified username
     *
     * @param username - The username we are querying for all the plans with
     * @returns - The plans if any exist under the specified username
     */
    public static getAllPlansWithUsername = async (
        username: string,
    ): Promise<ServerSidePlan[] | undefined> => {
        try {
            const result = await super.get<ServerSidePlan[] | undefined>(
                `${this.BASE_URL}get/all?username=${username}`,
            );
            return result;
        } catch (error: unknown) {
            Logger.log(
                "error",
                `Failed to get all plans with username ${username}, and error ${
                    (error as Error).message
                }`,
            );
            return undefined;
        }
    };
}
