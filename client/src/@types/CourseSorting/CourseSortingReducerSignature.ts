import type { CourseSortingAction } from "./CourseSortingAction";
import type { CourseSortingState } from "./CourseSortingState";

export type CourseSortingReducerSignature = (
    _state: CourseSortingState,
    _action: CourseSortingAction,
) => CourseSortingState;
