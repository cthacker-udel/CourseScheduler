/* eslint-disable no-magic-numbers -- not needed */
import { MILLISECONDS } from "src/common";

const TOKEN_TIME_ALLOWED = MILLISECONDS.HOUR * 5;
const TOKEN_REPLENISH_THRESHOLD = MILLISECONDS.HOUR;

export { TOKEN_REPLENISH_THRESHOLD, TOKEN_TIME_ALLOWED };
