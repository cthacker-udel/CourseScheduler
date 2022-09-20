/* eslint-disable @typescript-eslint/no-floating-promises -- disabled for router push */
import { useRouter } from "next/router";
import React from "react";
import type { SessionToken } from "src/@types";
import { SESSION_TOKEN_KEY } from "src/config/encryption/keys";
import { replenishToken } from "src/config/encryption/replenishToken";

/**
 * Validates the session token's `validUntil` attribute
 *
 * @param sessionToken - The session token
 * @returns Whether the token is valid
 */
const validateTokenTime = (sessionToken: SessionToken): boolean =>
    Date.now() <= sessionToken.validUntil;

/**
 * Custom hook for redirecting if the token is not valid, otherwise replenishing the token
 *
 */
export const useLogin = (): void => {
    const router = useRouter();

    React.useEffect(() => {
        const token = localStorage.getItem(SESSION_TOKEN_KEY);
        if (!token || !validateTokenTime(JSON.parse(token) as SessionToken)) {
            localStorage.removeItem(SESSION_TOKEN_KEY);
            router.push("/login");
        } else {
            replenishToken(token as unknown as SessionToken);
        }
    }, [router]);
};
