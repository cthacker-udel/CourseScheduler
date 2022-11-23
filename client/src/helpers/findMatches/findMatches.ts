/* eslint-disable @typescript-eslint/no-explicit-any -- disabled */
/* eslint-disable no-confusing-arrow -- disabled */
/**
 * Finds all values within `items` that match the value `value`
 *
 * @param items - The items to filter with
 * @param matchingValue - The value to filter by
 * @param itemMatcher - If not supplied, assume primitive types and arguments, if so, function used to compare the supplied value `value` and the item present in the stream
 */
export const findMatches = <T>(
    items: T[],
    matchingValue: unknown,
    itemMatcher?: (_argument1: T, _matchingValue: any) => boolean,
): T[] =>
    items.filter((eachItem: T) =>
        itemMatcher
            ? itemMatcher(eachItem, matchingValue)
            : eachItem === matchingValue,
    );
