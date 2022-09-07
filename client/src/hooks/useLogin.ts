import { useRouter } from "next/router";
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
export const useLogin = async (): Promise<void> => {
    const token = localStorage.getItem(SESSION_TOKEN_KEY);
    const router = useRouter();
    if (!token || !validateTokenTime(token as unknown as SessionToken)) {
        await router.push("/login");
    } else {
        replenishToken(token as unknown as SessionToken);
    }
};
