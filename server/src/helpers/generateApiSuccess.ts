import { HttpStatus } from "@nestjs/common";

/**
 * Generates an ApiSuccess response
 * @param _status The HttpStatus of the successful operation
 * @param result The result returned in the response
 */
export const generateApiSuccess = (_status: HttpStatus, _result?: any) => {
    return {
        status: _status,
        result: _result,
    };
};
