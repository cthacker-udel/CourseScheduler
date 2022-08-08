import type { CourseSortingState } from "./CourseSortingState";

type CourseSortingActionType =
    | "breadthRequirements"
    | "credits"
    | "description"
    | "id"
    | "name"
    | "preRequisites";

type CourseSortingPayload = CourseSortingState;

export type CourseSortingAction = {
    type: CourseSortingActionType;
    payload: CourseSortingPayload;
};
