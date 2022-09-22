import type { Course } from "../Course/Course";

/**
 * Semester type, contains a list of courses
 */
export type Semester = {
    id: string;
    term: number;
    year: number;
    title: string;
    description: string;
    courses: Course[];
};
