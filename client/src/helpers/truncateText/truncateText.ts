/* eslint-disable no-confusing-arrow -- prettier - eslint conflict */

const CONSTANTS = {
    BASE_LIMIT: 25,
    SUBSTRING_START: 0,
};

/**
 * Utility function to truncate text
 *
 * @param text The text to truncate
 * @param limit The character limit on the text, defaults to 25
 * @returns The truncated text
 */
export const truncateText = (
    description: string,
    limit = CONSTANTS.BASE_LIMIT,
): string =>
    description.length > limit
        ? `${description.slice(CONSTANTS.SUBSTRING_START, limit)}...`
        : description;
