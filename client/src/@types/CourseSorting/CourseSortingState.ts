import type { CourseFieldSort, CourseSort } from "../CourseSort/CourseSort";

export type CourseSortingState = CourseSort & {
    [key: string]: CourseFieldSort;
};
