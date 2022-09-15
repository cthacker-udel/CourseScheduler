import type { SessionToken } from "src/@types";

import { TOKEN_REPLENISH_THRESHOLD, TOKEN_TIME_ALLOWED } from "./constants";
import { SESSION_TOKEN_KEY } from "./keys";

/**
 * Utility function for determining whether we should replenish the token
 *
 * @param time - The current time we are evaluating whether it qualifies for replenishing
 * @returns Whether we should replenish the token or not
 */
const shouldReplenish = (time: number): boolean =>
    Math.abs(Date.now() - time) <= TOKEN_REPLENISH_THRESHOLD;

/**
 * Replenished a token by adding 5 hours to the time
 *
 * @param token - The token we are replenishing
 * @returns void
 */
export const replenishToken = (token: SessionToken): void => {
    if (shouldReplenish(token.validUntil)) {
        localStorage.setItem(
            SESSION_TOKEN_KEY,
            JSON.stringify({
                ...token,
                validUntil: token.validUntil + TOKEN_TIME_ALLOWED,
            } as SessionToken),
        );
    }
};
