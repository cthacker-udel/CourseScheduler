/**
 * Represents an error from the api
 */
export type ApiError = {
    /**
     * Status of the error
     */
    status: number;
    /**
     * The message associated with the error
     */
    message: string;
    /**
     * The code associated with the error
     */
    errorCode: number;
};
