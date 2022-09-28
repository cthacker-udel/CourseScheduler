import type { NextApiRequest, NextApiResponse } from "next";
import type { CreateSemester } from "src/@types";

import { ServerSideApi } from "./ServerSideApi";

/**
 * Server-side implementation of semester api
 */
export class SemestersApi extends ServerSideApi {
    public static BASE_URL = "/semester/";

    /**
     * Makes a request to add a semester with the data provided
     *
     * @param request - The request to send to the backend
     * @param response - The response sent to the client when the response is received from the backend
     */
    public static addSemester = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        const result = await super.post(
            `${this.BASE_URL}add`,
            JSON.parse(request.body) as CreateSemester,
        );
        response.json(result);
    };

    /**
     * Makes a backend request to fetch all semesters with username `username` passed in as a query
     *
     * @param request - The request to send to the backend
     * @param response - The response from the backend to send to the client
     */
    public static getAllSemesters = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        const { username } = request.query;
        const result = await super.post(
            `${this.BASE_URL}all?username=${username}`,
        );
        response.json(result);
    };
}
