import { ErrorCode } from "../@types/api/ErrorCode";

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
 * Error code for failing to create a plan
 */
export const PLAN_CREATION_FAILED_ERROR_CODE: ErrorCode = {
    message: "Plan failed to be created",
    code: 7,
};

export const SEMESTER_ALREADY_EXISTS_ERROR_CODE: ErrorCode = {
    message: "Semester already exists",
    code: 8,
};

/**
 * Enumerations of the error codes
 */
export const ERROR_CODES = {
    UNKNOWN_SERVER_FAILURE: UNKNOWN_SERVER_FAILURE_ERROR_CODE,
    USER_ALREADY_EXISTS: USER_ALREADY_EXISTS_ERROR_CODE,
    EMAIL_ALREADY_EXISTS: EMAIL_ALREADY_EXISTS_ERROR_CODE,
    USER_DOES_NOT_EXIST: USER_DOES_NOT_EXIST_ERROR_CODE,
    EMAIL_DOES_NOT_EXIST: EMAIL_DOES_NOT_EXIST_ERROR_CODE,
    PASSWORD_INVALID: PASSWORD_INVALID_ERROR_CODE,
    LOGIN_FAILED: LOGIN_FAILED_ERROR_CODE,
    PLAN_CREATION_FAILED_ERROR_CODE,
    SEMESTER_ALREADY_EXISTS_ERROR_CODE,
};
