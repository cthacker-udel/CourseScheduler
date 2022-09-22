/* eslint-disable no-magic-numbers -- not needed */
import type { NextApiRequest, NextApiResponse } from "next";
import type {
    AddPlanRequest,
    ApiError,
    ApiSuccess,
    ServerSidePlan,
} from "src/@types";

import { ServerSideApi } from "./ServerSideApi";

/**
 * Server-side implementation of the plans api, which will house all endpoints relating to plans
 */
export class PlansApi extends ServerSideApi {
    /**
     * Creates a plan, with the specified name and the specified semester ids
     *
     * @param request - The add plan request, appended into the body of the request
     * @param response - The response of the request, which is propagated up the caller
     */
    public static addPlan = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        const result = await super.post<ApiError | ApiSuccess>(
            "/plan/add",
            JSON.parse(request.body) as AddPlanRequest,
        );
        response.json(result);
    };

    /**
     * Get all plans with the supplied username via query string
     *
     * @param request - The request to fetch all plans with the supplied username
     * @param response - The response of the request, which is used to propagate the server-side response back to the client-side caller
     */
    public static getAllPlansWithUsername = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        const { username } = request.query;
        const result = await super.get<ServerSidePlan[] | undefined>(
            `/plan/all?username=${username}`,
        );
        response.json(result);
    };
}
