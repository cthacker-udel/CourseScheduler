import { HttpStatus } from "@nestjs/common";
import { ErrorCode } from "src/@types";

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
