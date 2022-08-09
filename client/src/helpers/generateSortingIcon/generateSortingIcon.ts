import {
    type IconDefinition,
    faSort,
    faSortDown,
    faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { SORTING } from "src/enums";

/**
 * Utility function for generating the icon the associated field is with depending on it's internal sorting state
 *
 * @param sort The current sorting state of the field
 * @returns The icon that represents the field
 */
export const generateSortingIcon = (sort: SORTING): IconDefinition => {
    if (sort === SORTING.INCREMENTING) {
        return faSortUp;
    } else if (sort === SORTING.DECREMENTING) {
        return faSortDown;
    }
    return faSort;
};
