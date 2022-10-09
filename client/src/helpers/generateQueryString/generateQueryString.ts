/* eslint-disable node/no-unsupported-features/node-builtins -- not needed */
/* eslint-disable no-magic-numbers -- not needed for entry access */
/**
 *
 * @param fields
 * @returns
 */
export const generateQueryString = (fields?: {
    [key: string]: unknown;
}): string => {
    if (fields) {
        const urlBuilder = new URLSearchParams();
        for (const eachPair of Object.entries(fields)) {
            if (typeof eachPair[1] === "string") {
                urlBuilder.append(eachPair[0], eachPair[1]);
            } else {
                urlBuilder.append(eachPair[0], JSON.stringify(eachPair[1]));
            }
        }
        return urlBuilder.toString();
    }
    return "";
};
