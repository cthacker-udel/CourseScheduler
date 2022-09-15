import { ResetToken as ResetTokenStruct } from "src/@types";

/**
 * The token used to reset username, password, email
 * TODO: maybe can be configured to be this type of object: { emailToken: string, usernameToken: string, passwordToken: string }
 * to allow the user to update multiple fields without being restricted to just one token, this can serve as a PoC
 * implementation
 */
export class ResetToken {
    email: ResetTokenStruct;
    password: ResetTokenStruct;
    username: ResetTokenStruct;
}
