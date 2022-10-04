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
        if (request.query?.courseName !== undefined) {
            const { courseName } = request.query;
            url += `?courseName=${courseName}`;
        }
        const result = await super.post<Lab[]>(url);
        response.json(result);
    };

    /**
     * Checks if a lab section exists in the database given the course name, section, and lab section being analyzed
     *
     * @param request - api from consumer client-side
     * @param response - response from server-side api to consumer
     */
    public static doesSectionExist = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        let url = `${this.BASE_URL}exist`;
        if (
            request.query?.courseName !== undefined &&
            request.query?.courseSection !== undefined &&
            request.query?.desiredSection !== undefined
        ) {
            const { courseName, courseSection, desiredSection } = request.query;
            url += `?courseName=${courseName}&courseSection=${courseSection}&desiredSection=${desiredSection}`;
        }
        const result = await super.get<boolean>(url);
        response.json(result);
    };
}
