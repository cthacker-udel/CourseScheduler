/* eslint-disable no-confusing-arrow -- prettier - eslint conflict */

const CONSTANTS = {
    BASE_LIMIT: 25,
    SUBSTRING_START: 0,
};

/**
 * Utility function to truncate the course description
 *
 * @param description The Course Description to truncate
 * @param limit The character limit on the description, defaults to 25
 * @returns The truncated description
 */
export const truncateCourseDescription = (
    description: string,
    limit = CONSTANTS.BASE_LIMIT,
): string =>
    description.length > limit
        ? `${description.substring(CONSTANTS.SUBSTRING_START, limit)}...`
        : description;
