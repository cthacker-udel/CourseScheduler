/**
 * Represents an request the user will send to retrieve an forgot password tokens
 */
export type ForgotPasswordRequest = {
    email: string;
    username: string;
};
