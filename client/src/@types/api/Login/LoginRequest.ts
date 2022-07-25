/**
 * The type of request a user will send in upon attempting to log in
 */
export type LoginRequest = {
    username: string;
    email: string;
    password: string;
};
