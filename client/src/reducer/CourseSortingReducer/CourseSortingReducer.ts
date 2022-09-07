import type { CourseSortingAction, CourseSortingState } from "src/@types";
import { SORTING, TRAJECTORY } from "src/enums";

type generateSortingOutput = {
    sort: SORTING;
    trajectory: TRAJECTORY;
};

/**
 * Utility function for generating the next sorting state depending on the current sorting state, updates the sorting state and the trajectory
 *
 * @param oldSort The current sorting state
 * @param oldTrajectory The trajectory the sorting is on
 * @returns The resulting sorting state and trajectory updated to reflect the next step
 */
const generateNextSortingState = (
    oldSort: SORTING,
    oldTrajectory: TRAJECTORY,
): generateSortingOutput => {
    switch (oldSort) {
        case SORTING.INCREMENTING: {
            return {
                sort: SORTING.NEUTRAL,
                trajectory: TRAJECTORY.DECREMENTING,
            };
        }
        case SORTING.DECREMENTING: {
            return {
                sort: SORTING.NEUTRAL,
                trajectory: TRAJECTORY.INCREMENTING,
            };
        }
        case SORTING.NEUTRAL: {
            if (oldTrajectory === TRAJECTORY.INCREMENTING) {
                return {
                    sort: SORTING.INCREMENTING,
                    trajectory: TRAJECTORY.DECREMENTING,
                };
            } else if (oldTrajectory === TRAJECTORY.DECREMENTING) {
                return {
                    sort: SORTING.DECREMENTING,
                    trajectory: TRAJECTORY.INCREMENTING,
                };
            }
            return {
                sort: oldSort,
                trajectory: oldTrajectory,
            };
        }
        default: {
            return {
                sort: oldSort,
                trajectory: oldTrajectory,
            };
        }
    }
};

/**
 * Redux reducer for managing the sorting state of the course table
 *
 * @param state The current state of the course sorting
 * @param action The action the user is attempting to
 */
export const CourseSortingReducer = (
    state: CourseSortingState,
    action: CourseSortingAction,
): CourseSortingState => {
    switch (action.type) {
        case "breadthRequirements": {
            const { sort, trajectory } = generateNextSortingState(
                state.breadthRequirements.sort,
                state.breadthRequirements.trajectory,
            );
            return {
                ...state,
                breadthRequirements: {
                    sort,
                    trajectory,
                },
            };
        }
        case "credits": {
            const { sort, trajectory } = generateNextSortingState(
                state.credits.sort,
                state.credits.trajectory,
            );
            return {
                ...state,
                credits: {
                    sort,
                    trajectory,
                },
            };
        }
        case "description": {
            const { sort, trajectory } = generateNextSortingState(
                state.description.sort,
                state.description.trajectory,
            );
            return {
                ...state,
                description: {
                    sort,
                    trajectory,
                },
            };
        }
        case "id": {
            const { sort, trajectory } = generateNextSortingState(
                state.id.sort,
                state.id.trajectory,
            );
            return {
                ...state,
                id: {
                    sort,
                    trajectory,
                },
            };
        }
        case "name": {
            const { sort, trajectory } = generateNextSortingState(
                state.name.sort,
                state.name.trajectory,
            );
            return {
                ...state,
                name: {
                    sort,
                    trajectory,
                },
            };
        }
        case "preRequisites": {
            const { sort, trajectory } = generateNextSortingState(
                state.preRequisites.sort,
                state.preRequisites.trajectory,
            );
            return {
                ...state,
                preRequisites: {
                    sort,
                    trajectory,
                },
            };
        }
        case "section": {
            const { sort, trajectory } = generateNextSortingState(
                state.section.sort,
                state.section.trajectory,
            );
            return {
                ...state,
                section: {
                    sort,
                    trajectory,
                },
            };
        }
        default: {
            return state;
        }
    }
};
