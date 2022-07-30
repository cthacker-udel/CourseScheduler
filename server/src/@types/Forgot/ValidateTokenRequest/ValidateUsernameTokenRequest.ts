/**
 * Represents a request the user will make when redeeming a token
 */
export type ValidateUsernameTokenRequest = {
    email: string;
    password: string;
    token: string;
};
