import { ErrorCode } from "src/@types";
import { VALID_CODES } from "src/@types/api/ServerSideErrorCodes";
import { lookupErrorCodeByCode } from "./lookupErrorCodeByCode";

/**
 * This function takes in a code (which has to be a valid code) and returns the corresponding ErrorCode
 * @param _code The code to generate the ErrorCode
 */
export const generateErrorCode = (_code: VALID_CODES): ErrorCode => {
    return lookupErrorCodeByCode(_code);
};
