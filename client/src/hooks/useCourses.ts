/* eslint-disable no-unexpected-multiline -- 1 error due to prettier */
import React from "react";
import type { Course } from "src/@types";
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
     * Courses organized by the section they are assigned to
     */
    sectionizedCourses: { [key: string]: Course[] };
};

/**
 * Utility hook for loading in courses from the JSON catalog
 *
 * @param props The props to filter the search by
 */
export const useCourses = ({
    section,
}: useCoursesProperties = {}): useCourseReturn => {
    const [courses, setCourses] = React.useState<Course[]>(
        CONSTANTS.parsedCourses,
    );

    const sections: string[] = React.useMemo(
        () => [
            ...new Set(
                CONSTANTS.parsedCourses.map((eachCourse) => eachCourse.section),
            ),
        ],
        [],
    );

    const sectionizedCourses = React.useMemo(() => {
        if (sections?.length) {
            const organizedSections: { [key: string]: Course[] } = {};
            // O(k)
            for (const eachSection of sections) {
                organizedSections[eachSection] = [];
            }
            // O(n)
            for (const eachCourse of CONSTANTS.parsedCourses) {
                organizedSections[eachCourse.section] = [
                    ...organizedSections[eachCourse.section],
                    eachCourse,
                ];
            }
            return organizedSections;
        }
        return undefined;
    }, [sections]);

    /**
     * If no sort is specified, and the sorting is triggered, then that means all sorting was neutralized, so therefore we should refresh the courses back to the original
     */
    const resetCourses = (): void => {
        setCourses(CONSTANTS.parsedCourses);
    };

    return {
        courses: sectionizedCourses ? sectionizedCourses[section] : courses,
        resetCourses,
        sectionizedCourses,
        sections,
    };
};
