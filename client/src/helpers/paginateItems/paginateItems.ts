/* eslint-disable no-magic-numbers -- disabled */
/**
 * Paginates items of type T into pages of `itemsPerPage`
 *
 * @param items - items to generate pagination of
 * @param itemsPerPage - # of items per page of pagination
 */
export const paginateItems = <T>(items: T[], itemsPerPage = 5): T[][] => {
    const paginatedItems: T[][] = [];
    let pageAccumulator: T[] = [];
    for (const eachItem of items) {
        if (pageAccumulator.length === itemsPerPage) {
            paginatedItems.push(pageAccumulator);
            pageAccumulator = [eachItem];
        } else {
            pageAccumulator.push(eachItem);
        }
    }
    if (pageAccumulator.length > 0) {
        paginatedItems.push(pageAccumulator);
    }
    return paginatedItems;
};
