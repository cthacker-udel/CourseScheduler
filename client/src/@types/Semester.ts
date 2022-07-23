import type { Course } from "./Course";

/**
 * Semester type, contains a list of courses
 */
export type Semester = {
    term: number;
    year: number;
    title?: string;
    description: string;
    courses: Course[];
};
