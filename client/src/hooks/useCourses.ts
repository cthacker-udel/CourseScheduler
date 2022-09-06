/* eslint-disable no-unexpected-multiline -- 1 error due to prettier */
import orderBy from "lodash.orderby";
import React from "react";
import type {
    Course,
    CourseSortingFields,
    CourseSortingOrder,
} from "src/@types";
import COURSES from "src/data/catalog.json";

const NAME_INDEX_SPLIT = 1;
const COURSE_NAME_SPLIT = 0;

const CONSTANTS = {
    ID_INDEX: 1,
    SECTION_IND: 0,
    SECTION_RANGE_LENGTH: 2,
    SECTION_RANGE_MAX_IND: 1,
    SECTION_RANGE_MIN_IND: 0,
    parsedCourses: (COURSES as Course[]).map((eachCourse) => ({
        ...eachCourse,
        name: eachCourse.name.split(" - ")[NAME_INDEX_SPLIT],
        section: eachCourse.name.split(" - ")[COURSE_NAME_SPLIT],
    })),
};

type useCoursesProperties = {
    /**
     * The id of the course to specifically lookup
     */
    id?: string;
    /**
     * The name of the course to specifically lookup
     */
    name?: string;
    /**
     * The number of credits to specifically lookup
     */
    credits?: string;
    /**
     * The prereqs of the course to specifically lookup
     */
    prereqs?: string;
    /**
     * The section of the course to lookup, id goes by format "SECTION ID#", so lookup just by section
     */
    section?: string;
    /**
     * The range of section to lookup, what that means is each course's id is the format "SECTION ID#", we apply a range filter to that ID# under that section
     * Range will look like [start, finish]
     */
    sectionRange?: number[];
};

/**
 * The return value of the hook
 */
type useCourseReturn = {
    /**
     * Will always return an array, whether it's singular or not
     */
    courses: Course[];

    /**
     * All the sections for all the current courses, memoized to avoid recomputation
     */
    sections: string[];

    /**
     * Resets all the courses to the original parsed courses
     */
    resetCourses: () => void;

    /**
     * Function for sorting courses via lodash's orderBy function, passing in fields to sort and order to sort them by
     * @see https://lodash.com/docs/4.17.15#orderBy
     */
    sortCourses: (
        _fields: CourseSortingFields[],
        _orders: CourseSortingOrder[],
    ) => void;
};

/**
 * Utility hook for loading in courses from the JSON catalog
 *
 * @param props The props to filter the search by
 */
export const useCourses = ({
    section,
    sectionRange,
}: useCoursesProperties = {}): useCourseReturn => {
    const [courses, setCourses] = React.useState<Course[]>(
        CONSTANTS.parsedCourses,
    );

    const sections = React.useMemo(
        () => [
            ...new Set(
                CONSTANTS.parsedCourses.map(
                    (eachCourse) =>
                        eachCourse.id.split(" ")[CONSTANTS.SECTION_IND],
                ),
            ),
        ],
        [],
    );

    /**
     * Utility for sorting the courses via the lodash orderBy function
     *
     * @param fields The fields to sort the courses by
     * @param orders The order to order the courses by, ascending or descending
     * @see https://lodash.com/docs/4.17.15#orderBy
     */
    const sortCourses = React.useCallback(
        (fields: CourseSortingFields[], orders: CourseSortingOrder[]): void => {
            const sortedCourses = orderBy(courses, fields, orders);
            setCourses(sortedCourses);
        },
        [courses],
    );

    /**
     * Utility function for sorting courses by filters provided by the user
     * @param oldCourses The old courses, previous state
     * @returns The filtered courses
     */
    const filterCourses = React.useCallback(
        (oldCourses: Course[]): Course[] => {
            let oldCoursesClone = [...oldCourses];
            if (section) {
                oldCoursesClone = oldCourses.filter((eachCourse: Course) =>
                    eachCourse.id
                        .split(" ")
                        [CONSTANTS.SECTION_IND].includes(section),
                );
            }
            if (
                sectionRange &&
                sectionRange.length === CONSTANTS.SECTION_RANGE_LENGTH
            ) {
                oldCoursesClone = oldCourses.filter((eachCourse: Course) => {
                    const sectionNumber = Number.parseInt(
                        eachCourse.id.split(" ")[CONSTANTS.ID_INDEX],
                        10,
                    );
                    return (
                        (sectionNumber >=
                            sectionRange[CONSTANTS.SECTION_RANGE_MIN_IND] ??
                            sectionNumber) &&
                        (sectionNumber <=
                            sectionRange[CONSTANTS.SECTION_RANGE_MAX_IND] ??
                            sectionNumber)
                    );
                });
            }
            return oldCoursesClone;
        },
        [section, sectionRange],
    );

    React.useEffect(() => {
        setCourses(() => filterCourses(CONSTANTS.parsedCourses));
    }, [filterCourses]);

    /**
     * If no sort is specified, and the sorting is triggered, then that means all sorting was neutralized, so therefore we should refresh the courses back to the original
     */
    const resetCourses = (): void => {
        setCourses(filterCourses(CONSTANTS.parsedCourses));
    };

    return {
        courses,
        resetCourses,
        sections,
        sortCourses,
    };
};
