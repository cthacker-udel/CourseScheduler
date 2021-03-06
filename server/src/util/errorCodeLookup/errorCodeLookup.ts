import { ERROR_CODES } from "src/ErrorCode";
import { ErrorCode, ValidCodes } from "src/@types";

/**
 * Maps valid code numbers to their respective error codes
 */
export const ERROR_CODE_LOOKUP: Record<ValidCodes, ErrorCode> = {
    0: ERROR_CODES.UNKNOWN_SERVER_FAILURE,
    1: ERROR_CODES.USER_ALREADY_EXISTS,
    2: ERROR_CODES.EMAIL_ALREADY_EXISTS,
    3: ERROR_CODES.USER_DOES_NOT_EXIST,
    4: ERROR_CODES.EMAIL_DOES_NOT_EXIST,
    5: ERROR_CODES.PASSWORD_INVALID,
    6: ERROR_CODES.LOGIN_FAILED,
};
