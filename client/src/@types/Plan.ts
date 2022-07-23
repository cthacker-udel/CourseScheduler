import type { Semester } from "./Semester";

/**
 * Plan type, contains a list of courses
 */
export type Plan = {
    name: string;
    description: string;
    semesters: Semester[];
};
