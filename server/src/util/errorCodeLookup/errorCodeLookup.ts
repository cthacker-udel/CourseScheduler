import {
    EMAIL_ALREADY_EXISTS_ERROR_CODE,
    EMAIL_DOES_NOT_EXIST_ERROR_CODE,
    ErrorCode,
    LOGIN_FAILED_ERROR_CODE,
    PASSWORD_INVALID_ERROR_CODE,
    UNKNOWN_SERVER_FAILURE_ERROR_CODE,
    USER_ALREADY_EXISTS_ERROR_CODE,
    USER_DOES_NOT_EXIST_ERROR_CODE,
    VALID_CODES,
} from "src/@types";

/**
 * Maps valid code numbers to their respective error codes
 */
export const ERROR_CODE_LOOKUP: Record<VALID_CODES, ErrorCode> = {
    0: UNKNOWN_SERVER_FAILURE_ERROR_CODE,
    1: USER_ALREADY_EXISTS_ERROR_CODE,
    2: EMAIL_ALREADY_EXISTS_ERROR_CODE,
    3: USER_DOES_NOT_EXIST_ERROR_CODE,
    4: EMAIL_DOES_NOT_EXIST_ERROR_CODE,
    5: PASSWORD_INVALID_ERROR_CODE,
    6: LOGIN_FAILED_ERROR_CODE,
};