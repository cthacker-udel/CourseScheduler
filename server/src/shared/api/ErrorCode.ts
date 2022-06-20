import { lookupErrorCodeByCode, VALID_CODES } from "./ServerSideErrorCodes";

/**
 * Represents the ErrorCode generated upon API failure
 */
export interface ErrorCode {
    message: string;
    code: VALID_CODES;
}

/**
 * This function takes in a code (which has to be a valid code) and returns the corresponding ErrorCode
 * @param _code The code to generate the ErrorCode
 */
export const generateErrorCode = (_code: VALID_CODES): ErrorCode => {
    return lookupErrorCodeByCode(_code);
};
