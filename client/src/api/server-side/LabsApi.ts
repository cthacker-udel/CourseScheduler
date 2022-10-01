import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiError, ApiSuccess, Lab } from "src/@types";

import { ServerSideApi } from "./ServerSideApi";

/**
 * Server-side lab api
 */
export class LabsApi extends ServerSideApi {
    public static readonly BASE_URL = "/lab/";

    /**
     * Adds a lab to the database
     *
     * @param request - The api request coming from the client-side
     * @param response - The api response to send to the consumer
     */
    public static addLab = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        const result = await super.post<ApiError | ApiSuccess>(
            `${this.BASE_URL}add`,
            JSON.parse(request.body) as Lab,
        );
        response.json(result);
    };

    /**
     * Fetches all labs with the supplied *courseId* in the request query string, if courseId not supplied, then fetches all labs
     *
     * @param request - The api request coming from the client-side
     * @param response - The api response to send to the consumer
     */
    public static getAllLabs = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        let url = this.BASE_URL;
        if (request.query?.courseId !== undefined) {
            const { courseId } = request.query;
            url += `?courseId=${courseId}`;
        }
        const result = await super.post<Lab[]>(url);
        response.json(result);
    };
}
