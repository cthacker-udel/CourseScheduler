import type { CourseSortingState } from "./CourseSortingState";

type CourseSortingActionType =
    | "breadthRequirements"
    | "credits"
    | "description"
    | "id"
    | "name"
    | "preRequisites"
    | "section";

type CourseSortingPayload = CourseSortingState;

type CourseSortingAction = {
    type: CourseSortingActionType;
    payload?: CourseSortingPayload;
};

export type { CourseSortingAction, CourseSortingActionType };
