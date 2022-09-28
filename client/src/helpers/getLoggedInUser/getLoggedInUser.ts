import { Logger } from "src/log/Logger";

import type { LoginRequest, SessionToken } from "../../@types";
import {
    decryptLoginInformation,
    SESSION_TOKEN_KEY,
} from "../../config/encryption";
/**
 * Fetches the logged in user from the localStorage, can only be called client-side when the component is rendered
 */
export const getLoggedInUser = (): LoginRequest => {
    try {
        const loginSessionInfo = localStorage.getItem(SESSION_TOKEN_KEY);
        if (loginSessionInfo) {
            const convertedSessionInfo = JSON.parse(
                loginSessionInfo,
            ) as SessionToken;
            const decryptedLoginSessionInfo = decryptLoginInformation(
                convertedSessionInfo.session,
            );
            return (
                decryptedLoginSessionInfo ?? {
                    email: "",
                    password: "",
                    username: "",
                }
            );
        }
        return {
            email: "",
            password: "",
            username: "",
        };
    } catch (error: unknown) {
        Logger.log("error", (error as Error).message);
        return {
            email: "",
            password: "",
            username: "",
        };
    }
};
