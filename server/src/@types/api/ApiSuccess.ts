import { HttpStatus } from "@nestjs/common";

/**
 * An ApiSuccess interface, status representing the response from the backend
 */
export type ApiSuccess = {
    status: HttpStatus;
    result?: any;
};
