import type { ApiError, ApiSuccess, Course } from "src/@types";
import { Logger } from "src/log/Logger";

import { ClientSideApi } from "./ClientSideApi";

/**
 * Client-side Course api
 */
export class CoursesApi extends ClientSideApi {
    public static readonly BASE_URL = "/course/";

    /**
     * Adds a course to the database
     *
     * @param course - The course to add to the database
     * @returns Whether or not a course was created, if so ApiSuccess, if not ApiError, if exception undefined
     */
    public static addCourse = async (
        course: Course,
    ): Promise<ApiError | ApiSuccess | undefined> => {
        try {
            const result = await super.post<ApiError | ApiSuccess>(
                `${this.BASE_URL}add`,
                course,
            );
            return result;
        } catch (error: unknown) {
            Logger.log("error", (error as Error).message);
            return undefined;
        }
    };

    /**
     * Fetches all courses from the database
     *
     * @returns All courses
     */
    public static getAllCourses = async (): Promise<Course[]> => {
        try {
            const result = await super.get<Course[]>(`${this.BASE_URL}all`);
            return result;
        } catch (error: unknown) {
            Logger.log("error", (error as Error).message);
            return [];
        }
    };
}
