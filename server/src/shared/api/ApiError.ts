import { HttpStatus } from "@nestjs/common";
import { ErrorCode } from "./ErrorCode";
import { VALID_CODES } from "./ServerSideErrorCodes";

/**
 * Represents an error occurring in the backend
 */
export interface ApiError {
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
}

/**
 * This function takes in an ErrorCode object and returns a formatted ApiError
 * @param _status The HTTP status of the operation
 * @param _errorCode The errorCode object to populate the fields
 * @returns An ApiError generated with an ErrorCode object
 */
export const generateApiError = (
    _status: HttpStatus,
    _errorCode: ErrorCode,
) => {
    return {
        status: _status,
        message: _errorCode.message,
        errorCode: _errorCode.code,
    };
};
