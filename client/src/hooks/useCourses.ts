/* eslint-disable no-unexpected-multiline -- 1 error due to prettier */
import React from "react";
import type { Course } from "src/@types";
import COURSES from "src/data/catalog.json";

const CONSTANTS = {
    ID_INDEX: 1,
    SECTION_IND: 0,
    SECTION_RANGE_LENGTH: 2,
    SECTION_RANGE_MAX_IND: 1,
    SECTION_RANGE_MIN_IND: 0,
    parsedCourses: COURSES as Course[],
};

type useCoursesProps = {
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
};

/**
 * Utility hook for loading in courses from the JSON catalog
 *
 * @param props The props to filter the search by
 */
export const useCourses = ({
    id,
    name,
    credits,
    prereqs,
    section,
    sectionRange,
}: useCoursesProps): useCourseReturn => {
    const [courses, setCourses] = React.useState<Course[]>(
        CONSTANTS.parsedCourses,
    );

    React.useEffect(() => {
        setCourses((oldCourses) => {
            let oldCoursesClone = [...oldCourses];
            if (id) {
                oldCoursesClone = oldCourses.filter((eachCourse: Course) =>
                    eachCourse.id.includes(id),
                );
            }
            if (name) {
                oldCoursesClone = oldCourses.filter((eachCourse: Course) =>
                    eachCourse.name.includes(name),
                );
            }
            if (credits) {
                oldCoursesClone = oldCourses.filter(
                    (eachCourse: Course) => eachCourse.credits === credits,
                );
            }
            if (prereqs) {
                oldCoursesClone = oldCourses.filter((eachCourse: Course) =>
                    eachCourse.prereqs.includes(prereqs),
                );
            }
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
                    const sectionNumber = parseInt(
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
        });
    }, [id, name, credits, prereqs, section, sectionRange]);
    return {
        courses,
    };
};
