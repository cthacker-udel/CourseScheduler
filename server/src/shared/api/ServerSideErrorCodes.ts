import { ErrorCode } from "./ErrorCode";

/**
 * ErrorCode for server failing reason unknown
 */
export const UNKNOWN_SERVER_FAILURE_ERROR_CODE: ErrorCode = {
    message: "Unknown API Error",
    code: 0,
};

/**
 * Errorcode for user already existing in database
 */
export const USER_ALREADY_EXISTS_ERROR_CODE: ErrorCode = {
    message: "User already exists",
    code: 1,
};

/**
 * ErrorCode for email already existing in the database
 */
export const EMAIL_ALREADY_EXISTS_ERROR_CODE: ErrorCode = {
    message: "Email already exists",
    code: 2,
};

/**
 * ErrorCode for user not existing in the database
 */
export const USER_DOES_NOT_EXIST_ERROR_CODE: ErrorCode = {
    message: "User does not exist",
    code: 3,
};

/**
 * ErrorCode for email not existing in the database
 */
export const EMAIL_DOES_NOT_EXIST_ERROR_CODE: ErrorCode = {
    message: "Email does not exist",
    code: 4,
};

/**
 * ErrorCode for invalid password
 */
export const PASSWORD_INVALID_ERROR_CODE: ErrorCode = {
    message: "Password is invalid",
    code: 5,
};

/**
 * ErrorCode for login failing
 */
export const LOGIN_FAILED_ERROR_CODE: ErrorCode = {
    message: "Login failed",
    code: 6,
};

/**
 * The valid codes
 */
export type VALID_CODES = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const ERROR_CODE_LOOKUP: Record<VALID_CODES, ErrorCode> = {
    0: UNKNOWN_SERVER_FAILURE_ERROR_CODE,
    1: USER_ALREADY_EXISTS_ERROR_CODE,
    2: EMAIL_ALREADY_EXISTS_ERROR_CODE,
    3: USER_DOES_NOT_EXIST_ERROR_CODE,
    4: EMAIL_DOES_NOT_EXIST_ERROR_CODE,
    5: PASSWORD_INVALID_ERROR_CODE,
    6: LOGIN_FAILED_ERROR_CODE,
};

/**
 * This function looks up the corresponding ErrorCode given a valid code
 * @param code The code to find via ERROR_CODE_LOOKUP
 * @returns The ErrorCode corresponding to the code given
 */
export const lookupErrorCodeByCode = (code: VALID_CODES) => {
    return ERROR_CODE_LOOKUP[code];
};
