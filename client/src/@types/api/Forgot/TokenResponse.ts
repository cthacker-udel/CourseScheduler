/**
 * Represents the api response when a user requests a token in the forgotten username flow
 */
export type TokenResponse = {
    token: string;
    validUntil: Date;
};
