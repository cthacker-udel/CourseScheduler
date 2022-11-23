/* eslint-disable camelcase -- disabled for one field */
/* eslint-disable react/no-array-index-key -- disabled */
/* eslint-disable no-magic-numbers -- disabled */
/* eslint-disable no-unused-vars -- disabled for now */
/* eslint-disable @typescript-eslint/indent -- prettier - eslint errors */

import React, { Suspense } from "react";
import { FloatingLabel, Form, Spinner } from "react-bootstrap";
import type { Course } from "src/@types";
import { CoursePaginationV2, MultiSelectSearch } from "src/common";
import { SingleSelectSearch } from "src/common/components/SingleSelectSearch";
import { paginateItems } from "src/helpers";
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
 * Returns the course stripped of it's properties and only returning necessary fields for display
 *
 * @param course - The course to parse
 * @returns - The stripped properties organized for display without re-ordering
 */
const readifyCourse = (course: Course): string[] => {
    const { title, id, section, credits, total_seats, teacher } = course;
    return [
        title ?? "N/A",
        id ?? "N/A",
        section ?? "N/A",
        credits ?? "N/A",
        total_seats ?? "N/A",
        teacher ?? "N/A",
    ];
};

/**
 * General component for viewing courses
 */
export const Read = (): JSX.Element => {
    const [section, setSection] = React.useState<string>("CISC");
    const [currentPage, setCurrentPage] = React.useState<number>(0);
    const { courses, sections } = useCourses({ section });
    const [paginatedCourses, setPaginatedCourses] = React.useState<Course[][]>(
        [],
    );
    const [itemsPerPage, setItemsPerPage] = React.useState<number>(5);

    React.useEffect(() => {
        if (courses !== undefined) {
            setPaginatedCourses(paginateItems<Course>(courses, itemsPerPage));
        }
    }, [courses, itemsPerPage]);

    return (
        <Suspense fallback={<Spinner animation="border" />}>
            <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center position-relative">
                <div
                    className={`position-absolute ${_styles.course_section_selector}`}
                >
                    <SingleSelectSearch caret items={sections} />
                </div>
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
                <div className={`${_styles.course_container}`}>
                    {paginatedCourses?.[currentPage]?.map(
                        (eachCourse: Course, _ind: number) => (
                            <div
                                className={`d-flex flex-row ${_styles.table_row} my-2 border`}
                                key={`${eachCourse.id}-${_ind}`}
                            >
                                {readifyCourse(eachCourse).map(
                                    (eachValue: string, _ind2: number) => (
                                        <div
                                            className={`${_styles.table_row_cell} text-center`}
                                            key={`${eachValue}-value-${_ind2}`}
                                        >
                                            {eachValue}
                                        </div>
                                    ),
                                )}
                            </div>
                        ),
                    )}
                </div>
                <CoursePaginationV2<Course>
                    currentPage={currentPage}
                    paginatedItems={paginatedCourses}
                    updateItemsPerPage={(newAmount: number): void => {
                        setItemsPerPage(newAmount);
                    }}
                    updatePage={(newPage: number): void => {
                        setCurrentPage(newPage);
                    }}
                />
            </div>
        </Suspense>
    );
};
