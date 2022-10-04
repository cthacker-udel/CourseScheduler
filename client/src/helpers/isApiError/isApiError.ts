/* eslint-disable @typescript-eslint/explicit-module-boundary-types -- disabled for generics */
/* eslint-disable @typescript-eslint/no-explicit-any -- needed for generics */
import type { ApiError } from "src/@types";

/**
 * Takes in an api response, and says whether or not the response is an api error
 *
 * @param response - The response to analyze
 * @returns Whether the response is an ApiError or not
 */
export const isApiError = (response: any): boolean => {
    const result = (response as ApiError)?.errorCode;
    return result !== undefined;
};
