/* eslint-disable no-unused-vars -- disabled for now */
/* eslint-disable @typescript-eslint/indent -- prettier - eslint errors */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import chunk from "lodash.chunk";
import React, { type ChangeEventHandler } from "react";
import { Form, OverlayTrigger } from "react-bootstrap";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";
import type {
    Course,
    CourseSortingReducerSignature,
    CourseSortingState,
} from "src/@types";
import type { CourseSortingActionType } from "src/@types/CourseSorting/CourseSortingAction";
import { CoursePagination } from "src/common";
import { initialCourseSortState, titleAbbreviationsToTitles } from "src/data";
import {
    generateSortingIcon,
    generateSortingOrderBy,
    generateTooltip,
    renderPreRequisites,
    truncateText,
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
    TABLE_CELL_CLASS_NAME: "w-100 p-3 border",
    TABLE_HEADERS: ["Section", "Credits", "Description", "Name"],
    TABLE_SORTING_ICON_FIELDS: ["section", "credits", "description", "name"],
};

/**
 * General component for viewing courses
 */
export const Read = (): JSX.Element => {
    const [section, setSection] = React.useState<string>("CISC");
    const [page, setPage] = React.useState<number>(CONSTANTS.DEFAULT_PAGE);
    const [isSorting, setIsSorting] = React.useState<boolean>(false);
    const [pageSize, setPageSize] = React.useState<number>(
        CONSTANTS.DEFAULT_PAGE_SIZE,
    );
    const { courses, resetCourses, sections, sortCourses } = useCourses({
        section,
    });

    const segmentedCourses = React.useMemo(
        () => chunk(courses, pageSize),
        [pageSize, courses],
    );

    const [sortingState, sortingDispatch] = React.useReducer<
        CourseSortingReducerSignature,
        CourseSortingState
    >(
        CourseSortingReducer,
        initialCourseSortState,
        () => initialCourseSortState,
    );

    React.useEffect(() => {
        if (sortingState !== undefined) {
            const generatedSort = generateSortingOrderBy(sortingState);
            if (generatedSort.commenceSort && isSorting) {
                sortCourses(
                    generatedSort.sortingFields,
                    generatedSort.sortingOrder,
                );
                setIsSorting(false);
            } else if (isSorting) {
                resetCourses();
                setIsSorting(false);
            }
        }
    }, [isSorting, resetCourses, sortCourses, sortingState]);

    return (
        <div className="text-center mt-3 w-75 mx-auto h-75">
            <div className="mb-3 p-2 w-50 mx-auto shadow d-flex flex-row justify-content-center">
                <span className="fw-bold fs-5 border-end border-secondary border-opacity-25 pe-4">
                    {"Course Viewer"}
                </span>
                <Form.Select
                    aria-label="Course Section Selector"
                    className="h-50 my-auto w-50 ms-4"
                    onChange={(
                        event: React.ChangeEvent<HTMLSelectElement>,
                    ): void => {
                        setSection(event.target.value);
                        setPage(0);
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
            <div className="w-100 border border border-primary border-opacity-25 rounded-5 mb-4 shadow">
                <div className="d-flex flex-row justify-content-around border">
                    {TEXT_CONSTANTS.TABLE_HEADERS.map((eachHeader, _ind) => (
                        <div
                            className="border border-bottom-0 border-top-0 p-3 w-100 bg-secondary bg-opacity-25"
                            key={`${eachHeader}-table-header`}
                        >
                            <div className="d-flex flex-row justify-content-center">
                                <span>{eachHeader}</span>
                                <FontAwesomeIcon
                                    className="p-1 ms-2 border border-secondary rounded my-auto"
                                    icon={generateSortingIcon(
                                        sortingState[
                                            TEXT_CONSTANTS
                                                .TABLE_SORTING_ICON_FIELDS[_ind]
                                        ]?.sort,
                                    )}
                                    onClick={(): void => {
                                        setIsSorting(true);
                                        sortingDispatch({
                                            type: TEXT_CONSTANTS
                                                .TABLE_SORTING_ICON_FIELDS[
                                                _ind
                                            ] as CourseSortingActionType,
                                        });
                                    }}
                                    role="button"
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="d-flex flex-column">
                    {segmentedCourses[page].map((eachCourse, _ind) => (
                        <div
                            className="border d-flex flex-row justify-content-around"
                            key={`${eachCourse.id}-${eachCourse.section}`}
                        >
                            <div
                                className={`${TEXT_CONSTANTS.TABLE_CELL_CLASS_NAME} ${_styles.course_table_cell}`}
                            >
                                {eachCourse.section}
                            </div>
                            <div
                                className={`${TEXT_CONSTANTS.TABLE_CELL_CLASS_NAME} ${_styles.course_table_cell}`}
                            >
                                <span className="fw-bold text-danger">
                                    {eachCourse.credits}
                                </span>
                            </div>
                            <div
                                className={`${TEXT_CONSTANTS.TABLE_CELL_CLASS_NAME} ${_styles.course_table_cell}`}
                            >
                                {eachCourse.description ? (
                                    <OverlayTrigger
                                        delay={{ hide: 250, show: 250 }}
                                        overlay={(
                                            properties: OverlayInjectedProps,
                                        ): JSX.Element =>
                                            generateTooltip(
                                                eachCourse.description,
                                                properties,
                                            )
                                        }
                                        placement="left"
                                    >
                                        <div>
                                            {truncateText(
                                                eachCourse.description,
                                            )}
                                        </div>
                                    </OverlayTrigger>
                                ) : (
                                    <span className="text-muted fw-light">
                                        {TEXT_CONSTANTS.INVALID_DESCRIPTION}
                                    </span>
                                )}
                            </div>
                            <div
                                className={`${TEXT_CONSTANTS.TABLE_CELL_CLASS_NAME} ${_styles.course_table_cell}`}
                            >
                                {truncateText(eachCourse.name) ===
                                eachCourse.name ? (
                                    <div>{eachCourse.name}</div>
                                ) : (
                                    <OverlayTrigger
                                        delay={{ hide: 250, show: 250 }}
                                        overlay={(
                                            properties: OverlayInjectedProps,
                                        ): JSX.Element =>
                                            generateTooltip(
                                                eachCourse.name,
                                                properties,
                                            )
                                        }
                                        placement="left"
                                    >
                                        <div>
                                            {truncateText(eachCourse.name)}
                                        </div>
                                    </OverlayTrigger>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <CoursePagination
                currentPage={page}
                customItemStyle="course"
                moveToPage={(newPage: number): void => {
                    setPage(newPage);
                }}
                pagesCount={segmentedCourses.length}
                paginationSize="sm"
            />
        </div>
    );
};
