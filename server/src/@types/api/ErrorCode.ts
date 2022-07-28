import { ValidCodes } from "./ValidCodes";

/**
 * Represents the ErrorCode generated upon API failure
 */
export type ErrorCode = {
    message: string;
    code: ValidCodes;
};
