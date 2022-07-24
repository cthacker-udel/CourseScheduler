import { VALID_CODES } from "./ServerSideErrorCodes";

/**
 * Represents the ErrorCode generated upon API failure
 */
export type ErrorCode = {
    message: string;
    code: VALID_CODES;
};
