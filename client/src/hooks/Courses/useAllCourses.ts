import React from "react";
import type { Course } from "src/@types";
import { CoursesApi } from "src/api/client-side/CoursesApi";
import LOCAL_COURSES from "src/data/catalog.json";
import { Logger } from "src/log/Logger";

type useAllCoursesReturn = {
    courses: Course[];
};

/**
 * Fetches all courses from the local data and also the database, and returns that population
 */
export const useAllCourses = (
    filter: Course & { username: string },
): useAllCoursesReturn => {
    const [courses, setCourses] = React.useState<Course[]>([]);

    React.useEffect(() => {
        CoursesApi.getAllCourses(filter)
            .then((fetchedCourses: Course[]) => {
                setCourses((oldCourses) => {
                    if (oldCourses?.length) {
                        return [
                            ...oldCourses,
                            ...(fetchedCourses.map((eachCourse) => ({
                                ...eachCourse,
                                credits: `${eachCourse.credits}`,
                                ebreadth: "",
                                id: "",
                                preRequisites: "",
                            })) as Course[]),
                        ];
                    }
                    return [...fetchedCourses, ...(LOCAL_COURSES as Course[])];
                });
            })
            .catch((error: unknown) => {
                Logger.log("error", (error as Error).message);
            });
    }, [filter]);

    return {
        courses,
    };
};
