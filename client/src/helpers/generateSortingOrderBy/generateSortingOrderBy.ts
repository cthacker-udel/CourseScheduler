/* eslint-disable no-confusing-arrow -- prettier conflict  */
import type {
    CourseSortingFields,
    CourseSortingOrder,
    CourseSortingState,
} from "src/@types";
import { SORTING } from "src/enums";

/**
 * The minimum the sorting fields length can be
 */
const MIN_SORTING_FIELDS_LENGTH = 1;

type SortingOrderByOutput = {
    /**
     * The fields to sort by, id, name, credits, etc
     */
    sortingFields: CourseSortingFields[];
    /**
     * The order to sort by "asc" or "desc"
     */
    sortingOrder: CourseSortingOrder[];
    /**
     * Whether to commence the sort or not, rather then do a array length comparison in the front-end, do it before we return the value
     */
    commenceSort: boolean;
};

/**
 * Utility function for generating the direction given the sorting
 *
 * @param direction The direction the sort is going in
 * @returns The key for which way to sort, passed into lodash's `orderBy` function
 * @see https://lodash.com/docs/4.17.15#orderBy
 */
const generateDirectionFromSorting = (direction: SORTING): CourseSortingOrder =>
    direction === SORTING.INCREMENTING ? "asc" : "desc";

/**
 * Utility function to generate the sorting order for the courses
 *
 * @param state - The current sorting state of the application
 * @returns The fields to be sorted and the direction to sort them in, for usage in the lodash `orderBy` function
 * @see https://lodash.com/docs/4.17.15#orderBy for reference to the `orderBy` function
 */
export const generateSortingOrderBy = (
    state: CourseSortingState,
): SortingOrderByOutput => {
    const sortingFields: CourseSortingFields[] = Object.keys(state).filter(
        (eachKey) => state[eachKey].sort !== SORTING.NEUTRAL,
    ) as CourseSortingFields[];
    const sortingOrder: CourseSortingOrder[] = sortingFields.map((eachField) =>
        generateDirectionFromSorting(state[eachField].sort),
    );
    return {
        commenceSort: sortingFields.length >= MIN_SORTING_FIELDS_LENGTH,
        sortingFields,
        sortingOrder,
    };
};
