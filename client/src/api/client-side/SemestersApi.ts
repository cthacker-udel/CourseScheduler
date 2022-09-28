import type { ApiError, ApiSuccess, CreateSemester } from "src/@types";
import { Logger } from "src/log/Logger";

import { ClientSideApi } from "./ClientSideApi";

/**
 * Client-side SemesterApi, constructs calls to send to the server-side
 */
export class SemestersApi extends ClientSideApi {
    public static BASE_URL = "/semester/";

    /**
     * Client-side api for adding a semester
     *
     * @param semesterData - Semester data sent to the server-side to process and send a request to the backend
     * @returns ApiSuccess if semester is added and ApiError if semester is not added (failure occurred)
     */
    public static addSemester = async (
        semesterData: CreateSemester,
    ): Promise<ApiError | ApiSuccess | undefined> => {
        try {
            const result = await super.post<ApiError | ApiSuccess>(
                `${this.BASE_URL}add`,
                semesterData,
            );
            return result;
        } catch (error: unknown) {
            Logger.log(
                "error",
                `Failed to create semester client-side ${
                    (error as Error).message
                }`,
            );
            return undefined;
        }
    };
}
