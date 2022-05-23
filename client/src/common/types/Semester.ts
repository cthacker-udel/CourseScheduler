import type Course from "./Course";

/**
 * Semester type, contains a list of courses
 */
interface Semester {
    term: string;
    year: number;
    title?: string;
    description: string;
    courses: Course[];
}

export default Semester;
