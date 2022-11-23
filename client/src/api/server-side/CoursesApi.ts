/* eslint-disable @typescript-eslint/indent -- prettier/eslint conflicts */
/* eslint-disable no-magic-numbers -- not needed */
import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiError, ApiSuccess, Course } from "src/@types";

import { ServerSideApi } from "./ServerSideApi";

/**
 * Server-side api for updating courses
 */
export class CoursesApi extends ServerSideApi {
    public static readonly BASE_URL = "/course/";

    /**
     * Makes a request to the server-side to create a course
     *
     * @param request - The client-side request
     * @param response - The response to the consumer
     */
    public static addCourse = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        const result = await super.post<ApiError | ApiSuccess>(
            `${this.BASE_URL}add`,
            JSON.parse(request.body) as Course,
        );
        response.json(result);
    };

    /**
     * Makes a request to fetch all courses from the database
     *
     * @param request - The client-side request
     * @param response - The response to the consumer
     */
    public static getAllCourses = async (
        request: NextApiRequest,
        response: NextApiResponse,
    ): Promise<void> => {
        const query =
            Object.keys(request.query).length > 0
                ? `?${Object.entries(request.query)
                      .map((eachEntry) => `${eachEntry[0]}=${eachEntry[1]}`)
                      .join("&")}`
                : "";
        const result = await super.get<Course[]>(`${this.BASE_URL}all${query}`);
        response.json(result);
    };
}
