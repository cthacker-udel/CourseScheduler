type TokenAccepted = {
    accepted: boolean;
};

export type TokenValidationResponse = {
    status: number;
    result: TokenAccepted;
};
