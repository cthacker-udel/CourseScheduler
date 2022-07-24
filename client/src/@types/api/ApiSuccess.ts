/**
 * Represents an success from the api
 */
export type ApiSuccess = {
    /**
     * The status of the response
     */
    status: number;
    /**
     * The result of the success, contains more information that can be used in the front-end
     */
    result?: unknown;
};
