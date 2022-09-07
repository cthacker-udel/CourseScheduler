import type { CourseSortingState } from "src/@types";
import { SORTING, TRAJECTORY } from "src/enums";

/**
 * Initial Course Sorting State
 */
export const initialCourseSortState: CourseSortingState = {
    breadthRequirements: {
        sort: SORTING.NEUTRAL,
        trajectory: TRAJECTORY.INCREMENTING,
    },
    credits: {
        sort: SORTING.NEUTRAL,
        trajectory: TRAJECTORY.INCREMENTING,
    },
    description: {
        sort: SORTING.NEUTRAL,
        trajectory: TRAJECTORY.INCREMENTING,
    },
    id: {
        sort: SORTING.NEUTRAL,
        trajectory: TRAJECTORY.INCREMENTING,
    },
    name: {
        sort: SORTING.NEUTRAL,
        trajectory: TRAJECTORY.INCREMENTING,
    },
    preRequisites: {
        sort: SORTING.NEUTRAL,
        trajectory: TRAJECTORY.INCREMENTING,
    },
    section: {
        sort: SORTING.NEUTRAL,
        trajectory: TRAJECTORY.INCREMENTING,
    },
};
