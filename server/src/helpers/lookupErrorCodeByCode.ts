import { VALID_CODES } from "src/@types/api/ServerSideErrorCodes";
import { ERROR_CODE_LOOKUP } from "src/util";

/**
 * This function looks up the corresponding ErrorCode given a valid code
 * @param code The code to find via ERROR_CODE_LOOKUP
 * @returns The ErrorCode corresponding to the code given
 */
export const lookupErrorCodeByCode = (code: VALID_CODES) => {
    return ERROR_CODE_LOOKUP[code];
};
