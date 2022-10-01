import { ERROR_CODE_LOOKUP } from "src/util";

/**
 * This function looks up the corresponding ErrorCode given a valid code
 * @param code The code to find via ERROR_CODE_LOOKUP
 * @returns The ErrorCode corresponding to the code given
 */
export const lookupErrorCodeByCode = (code: number) => {
    return ERROR_CODE_LOOKUP[code];
};
