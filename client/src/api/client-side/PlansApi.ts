import type { AddPlanRequest, ApiError, ApiSuccess } from "src/@types";

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
        const result = await super.post<ApiError | ApiSuccess>(
            `${this.BASE_URL}add`,
            request,
        );
        return result;
    };
}
