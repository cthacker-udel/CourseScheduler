/* eslint-disable @typescript-eslint/explicit-module-boundary-types -- needed for generics */
/* eslint-disable @typescript-eslint/no-explicit-any -- needed for generics */
import type { ApiError, ApiSuccess } from "src/@types";

/**
 * Returns whether or not the response received is an apiSuccess or not
 *
 * @param response - The response to analyze
 * @returns Whether the response is an apiSuccess
 */
export const isApiSuccess = (response: any): boolean => {
    const result =
        (response as ApiSuccess)?.result !== undefined &&
        (response as ApiError)?.errorCode === undefined;
    return result;
};
