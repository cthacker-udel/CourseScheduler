/* eslint-disable no-unused-vars -- disabled for now */
/* eslint-disable @typescript-eslint/indent -- prettier - eslint errors */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from "@mui/material/Table";
import { type GridCallbackDetails, DataGrid } from "@mui/x-data-grid";
import chunk from "lodash.chunk";
import React, { type ChangeEventHandler } from "react";
import { Form } from "react-bootstrap";
import type {
    Course,
    CourseSortingReducerSignature,
    CourseSortingState,
} from "src/@types";
import { CoursePagination } from "src/common";
import { initialCourseSortState, titleAbbreviationsToTitles } from "src/data";
import {
    generateDataGridColumnsCourse,
    generateDataGridRows,
    generateSortingIcon,
    generateSortingOrderBy,
    renderPreRequisites,
    truncateCourseDescription,
} from "src/helpers";
import { useCourses } from "src/hooks/useCourses";
import { CourseSortingReducer } from "src/reducer";

import _styles from "./Read.module.css";

/**
 * Constants for the Read component
 */
const CONSTANTS = {
    // eslint-disable-next-line no-magic-numbers -- no need
    COURSE_AMOUNT_SELECTIONS: [5, 10, 30, 60],
    DEFAULT_PAGE: 0,
    DEFAULT_PAGE_SIZE: 10,
    DESCRIPTION_LENGTH: 75,
    EVEN_DIVISIBLE: 2,
    ID_INDEX: 1,
    MOD_EVEN: 0,
    NAME_INDEX: 1,
    PAGINATION_INC: 1,
    PLACEHOLDER_FILL: 0,
    PLACEHOLDER_FILL_SIZE: 6,
};

const TEXT_CONSTANTS = {
    INVALID_BREADTH_REQUIREMENTS: "No Breadth Requirements",
    INVALID_CREDITS: "No Credits",
    INVALID_DESCRIPTION: "No Description",
    INVALID_E_BREADTH: "No Elective Breadth",
    INVALID_PREREQUISITES: "No Pre-Requisites",
    NUMBER_OF_COURSES: "# of Courses",
};

/**
 * General component for viewing courses
 */
export const Read = (): JSX.Element => {
    const [section, setSection] = React.useState<string>("CISC");
    const { courses, resetCourses, sections, sortCourses } = useCourses({
        section,
    });

    const [isSorting, setIsSorting] = React.useState<boolean>(false);

    const [pageSize, setPageSize] = React.useState<number>(
        CONSTANTS.DEFAULT_PAGE_SIZE,
    );

    const [page, setPage] = React.useState<number>(CONSTANTS.DEFAULT_PAGE);

    return (
        <div className="text-center mt-3 w-75 mx-auto h-75">
            <div className="mb-3 p-2 w-50 mx-auto shadow d-flex flex-row justify-content-between">
                <span className="fw-bold fs-5">{"Course Viewer"}</span>
                <Form.Select
                    aria-label="Course Section Selector"
                    className="h-50 my-auto w-50"
                    onChange={(
                        event: React.ChangeEvent<HTMLSelectElement>,
                    ): void => {
                        console.log(event.target.value);
                        setSection(event.target.value);
                    }}
                    value={section}
                >
                    {sections.map((eachSection) => (
                        <option key={`${eachSection}`} value={eachSection}>
                            {titleAbbreviationsToTitles[eachSection]}
                        </option>
                    ))}
                </Form.Select>
            </div>
            <DataGrid
                checkboxSelection
                columns={generateDataGridColumnsCourse()}
                onPageSizeChange={(
                    newPageSize: number,
                    _details: GridCallbackDetails,
                ): void => {
                    setPageSize(newPageSize);
                }}
                pageSize={pageSize}
                rows={generateDataGridRows(courses)}
                rowsPerPageOptions={CONSTANTS.COURSE_AMOUNT_SELECTIONS}
                showCellRightBorder
            />
        </div>
    );
};
