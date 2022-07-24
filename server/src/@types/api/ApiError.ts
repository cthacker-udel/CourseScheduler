import { HttpStatus } from "@nestjs/common";
import { VALID_CODES } from "./ServerSideErrorCodes";

/**
 * Represents an error occurring in the backend
 */
export type ApiError = {
    /**
     * The HTTP response code
     */
    status: HttpStatus;
    /**
     * The error message
     */
    message: string;
    /**
     * The error code, designating what kind of error occurred
     */
    errorCode: VALID_CODES;
};
