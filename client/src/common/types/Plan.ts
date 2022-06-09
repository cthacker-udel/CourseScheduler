import type Semester from "./Semester";

/**
 * Plan type, contains a list of courses
 */
interface Plan {
    name: string;
    description: string;
    semesters: Semester[];
}

export default Plan;
