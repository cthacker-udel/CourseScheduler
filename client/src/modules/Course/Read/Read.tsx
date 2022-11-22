/* eslint-disable no-magic-numbers -- disabled */
/* eslint-disable no-unused-vars -- disabled for now */
/* eslint-disable @typescript-eslint/indent -- prettier - eslint errors */

import React, { Suspense } from "react";
import { Spinner } from "react-bootstrap";
import type { Course } from "src/@types";
import { CoursePaginationV2 } from "src/common";
import { useCourses } from "src/hooks/useCourses";

import _styles from "./Read.module.css";

const SORTING_OPTIONS = [
    "Title",
    "ID",
    "Section",
    "Credits",
    "Total Seats",
    "Teacher",
];

/**
 * General component for viewing courses
 */
export const Read = (): JSX.Element => {
    const [section, setSection] = React.useState<string>("CISC");
    const [currentPage, setCurrentPage] = React.useState<number>(0);
    const { courses } = useCourses({ section });

    React.useEffect(() => {
        console.log(courses);
    }, [courses]);

    return (
        <Suspense fallback={<Spinner animation="border" />}>
            <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
                <div className={`d-flex flex-row ${_styles.table_header}`}>
                    {SORTING_OPTIONS.map((eachSortingOption: string) => (
                        <div
                            className={`p-3 ${_styles.table_header_cell} text-center border border-dark fw-bold bg-secondary bg-opacity-25 position-relative`}
                            key={eachSortingOption}
                        >
                            {eachSortingOption}
                        </div>
                    ))}
                </div>
                <CoursePaginationV2<Course>
                    currentPage={currentPage}
                    items={courses}
                    itemsPerPage={5}
                    updatePage={(newPage: number): void => {
                        setCurrentPage(newPage);
                    }}
                />
            </div>
        </Suspense>
    );
};
