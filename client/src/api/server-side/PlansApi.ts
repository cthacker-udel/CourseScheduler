import type { NextApiRequest, NextApiResponse } from "next";
import type { AddPlanRequest, ApiError, ApiSuccess } from "src/@types";

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
}
