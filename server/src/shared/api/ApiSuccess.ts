import { HttpStatus } from "@nestjs/common";

/**
 * An ApiSuccess interface, status representing the response from the backend
 */
export interface ApiSuccess {
    status: HttpStatus;
    result?: any;
}

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
