/**
 * The login request that will be sent to the api to create a new user
 */
export type SignUpRequest = {
    email: string;
    username: string;
    password: string;
};
