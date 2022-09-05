import type { Course, CourseTable } from "src/@types";

/**
 * Utility function for receiving an array of courses, and returning the updated CourseTable state
 *
 * @param courses The courses to generate the state from
 * @returns The generated course table state that will contain all the updated courses according to the sorting method or page selected
 */
export const generateTableColumns = (courses: Course[]): CourseTable => {
    const ids: string[] = [];
    const names: string[] = [];
    const credits: string[] = [];
    const descriptions: string[] = [];
    const preRequisites: string[] = [];
    const breadthRequirements: string[] = [];
    for (const eachCourse of courses) {
        ids.push(eachCourse.id);
        names.push(eachCourse.name);
        credits.push(eachCourse.credits);
        descriptions.push(eachCourse.description);
        preRequisites.push(eachCourse.preRequisites);
        breadthRequirements.push(eachCourse.breadthRequirements);
    }
    return {
        breadthRequirements,
        credits,
        descriptions,
        ids,
        names,
        preRequisites,
    };
};
