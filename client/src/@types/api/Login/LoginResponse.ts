/**
 * Response type from the backend when client attempts to login
 */
export type LoginResponse = {
    accessToken: string;
    canLogin: boolean;
};
