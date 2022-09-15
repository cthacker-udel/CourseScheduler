import type { CourseFieldSort, CourseSort } from "../Sort/CourseSort";

export type CourseSortingState = CourseSort & {
    [key: string]: CourseFieldSort;
};
