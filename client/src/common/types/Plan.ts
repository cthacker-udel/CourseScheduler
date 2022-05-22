import type Semester from "./Semester";

/**
 * Plan type, contains a list of courses
 */
interface Plan {
    semesters: Semester[];
}

export default Plan;
