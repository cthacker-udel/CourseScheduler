import React from "react";
import type { Course } from "src/@types";
import type { LocalCourse } from "src/@types/Course/LocalCourse";
import { CoursesApi } from "src/api/client-side/CoursesApi";
import LOCAL_COURSES from "src/data/catalog.json";
import { Logger } from "src/log/Logger";

type useAllCoursesReturn = {
    courses: LocalCourse[];
};

/**
 * Fetches all courses from the local data and also the database, and returns that population
 */
export const useAllCourses = (): useAllCoursesReturn => {
    const [courses, setCourses] = React.useState<LocalCourse[]>([]);

    React.useEffect(() => {
        CoursesApi.getAllCourses()
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
                            })) as LocalCourse[]),
                        ];
                    }
                    return [
                        ...fetchedCourses,
                        ...(LOCAL_COURSES as LocalCourse[]),
                    ];
                });
            })
            .catch((error: unknown) => {
                Logger.log("error", (error as Error).message);
            });
    }, []);

    return {
        courses,
    };
};
