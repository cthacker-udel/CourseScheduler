import type { ApiError, ApiSuccess, Lab } from "src/@types";
import { Logger } from "src/log/Logger";

import { ClientSideApi } from "./ClientSideApi";

/**
 * Client-side Lab api interface
 */
export class LabsApi extends ClientSideApi {
    public static readonly BASE_URL = "/lab/";

    /**
     * Adds a lab to the database
     *
     * @param labRequest - The data to add the lab to the database
     * @returns - ApiSuccess if lab is created successfully and ApiError if it fails
     */
    public static addLab = async (
        labRequest: Lab,
    ): Promise<ApiError | ApiSuccess | undefined> => {
        try {
            const result = await super.post<ApiError | ApiSuccess>(
                `${this.BASE_URL}add`,
                labRequest,
            );
            return result;
        } catch (error: unknown) {
            Logger.log("error", (error as Error).message, "LabsApi.ts");
            return undefined;
        }
    };

    /**
     * **GET** request that filters all labs by the supplied courseId
     *
     * @param courseId - The courseId to filter the labs by, is optional
     * @returns The labs found with the filter
     */
    public static getAllLabs = async (courseId?: string): Promise<Lab[]> => {
        try {
            let url = `${this.BASE_URL}all`;
            if (courseId) {
                url += `?courseId=${courseId}`;
            }
            const result = await super.get<Lab[]>(url);
            return result;
        } catch (error: unknown) {
            Logger.log("error", (error as Error).message, "LabsApi.ts");
            return [];
        }
    };
}
