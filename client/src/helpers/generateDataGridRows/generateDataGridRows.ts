import type { GridRowsProp } from "@mui/x-data-grid";
import type { Course } from "src/@types";

const TEXT_CONSTANTS = {
    INVALID_BREADTH_REQUIREMENTS: "No Breadth Requirements",
    INVALID_CREDITS: "No Credits",
    INVALID_DESCRIPTION: "No Description",
    INVALID_E_BREADTH: "No Elective Breadth",
    INVALID_NAME: "No name",
    INVALID_PREREQUISITES: "No Pre-Requisites",
    NUMBER_OF_COURSES: "# of Courses",
};

/**
 * Utility function for generating a data table row
 *
 * @param course - The course we are generating a row prop from
 * @param id - The id we are assigning to the row
 * @returns The datagrid row we are using to render the DataTable
 */
const generateDataGridRow = (
    course: Course,
    id: number,
): { [key: number | string]: number | string } => {
    const { id: _courseId, ...rest } = course;
    return {
        breadthRequirements:
            rest.breadthRequirements ||
            TEXT_CONSTANTS.INVALID_BREADTH_REQUIREMENTS,
        courseSection: rest.courseSection,
        credits: rest.credits || TEXT_CONSTANTS.INVALID_CREDITS,
        description: rest.description || TEXT_CONSTANTS.INVALID_DESCRIPTION,
        id,
        name: rest.name || TEXT_CONSTANTS.INVALID_NAME,
        preRequisites:
            rest.preRequisites || TEXT_CONSTANTS.INVALID_PREREQUISITES,
    };
};

/**
 * Utility function for generating data table rows
 *
 * @param courses - The list of courses we are rendering into the data table row
 * @returns - The data table page
 */
export const generateDataGridRows = (courses: Course[]): GridRowsProp =>
    courses.map((eachCourse, _ind) =>
        generateDataGridRow(eachCourse, _ind),
    ) as GridRowsProp;
