/* eslint-disable @typescript-eslint/indent -- prettier - eslint errors */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import chunk from "lodash.chunk";
import React from "react";
import { ListGroup, Pagination } from "react-bootstrap";
import type {
    Course,
    CourseSortingReducerSignature,
    CourseSortingState,
    CourseTable,
} from "src/@types";
import { initialCourseSortState, initialCourseTableState } from "src/data";
import {
    generateSortingIcon,
    generateSortingOrderBy,
    generateTableColumns,
    truncateCourseDescription,
} from "src/helpers";
import { useCourses } from "src/hooks/useCourses";
import { CourseSortingReducer } from "src/reducer";

import styles from "./Read.module.css";

/**
 * Constants for the Read component
 */
const CONSTANTS = {
    DEFAULT_PAGE: 0,
    DEFAULT_PAGE_SIZE: 10,
    DESCRIPTION_LENGTH: 75,
    EVEN_DIVISIBLE: 2,
    ID_INDEX: 1,
    MOD_EVEN: 0,
    NAME_INDEX: 1,
    PLACEHOLDER_FILL: 0,
    PLACEHOLDER_FILL_SIZE: 6,
};

/**
 * General component for viewing courses
 */
export const Read = (): JSX.Element => {
    const { courses, resetCourses, sortCourses } = useCourses({
        section: "CISC",
    });

    const [isSorting, setIsSorting] = React.useState<boolean>(false);

    const [pageSize, setPageSize] = React.useState<number>(
        CONSTANTS.DEFAULT_PAGE_SIZE,
    );

    const [page, setPage] = React.useState<number>(CONSTANTS.DEFAULT_PAGE);

    const segmentedCourses = React.useMemo(
        () => chunk(courses, pageSize),
        [pageSize, courses],
    );

    const [tableColumns, setTableColumns] = React.useState<CourseTable>(
        initialCourseTableState,
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
        console.log("segmentedCourses changed");
        setTableColumns(generateTableColumns(segmentedCourses[page]));
    }, [page, segmentedCourses]);

    React.useEffect(() => {
        console.log(tableColumns);
    }, [tableColumns]);

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
        <>
            <div
                className={`${styles.course_table_header} my-3 w-25 mx-auto rounded border border-left border-right border-bottom-0 border-top-0 bg-secondary bg-opacity-25 fw-bold fs-4 text-center py-4`}
            >
                {"Course List"}
            </div>
            <ListGroup
                className={`mx-auto ${styles.course_sort_row}`}
                horizontal
            >
                <ListGroup.Item
                    className={`${styles.course_data_table_header_id}`}
                >
                    <div className="d-flex flex-row">
                        <span>{"ID"}</span>
                        <FontAwesomeIcon
                            className="my-auto ps-2"
                            icon={generateSortingIcon(sortingState.id.sort)}
                            onClick={(): void => {
                                setIsSorting(true);
                                sortingDispatch({ type: "id" });
                            }}
                            role="button"
                        />
                    </div>
                </ListGroup.Item>
                <ListGroup.Item
                    className={`${styles.course_data_table_header_name}`}
                >
                    <div className="d-flex flex-row">
                        <span>{"Name"}</span>
                        <FontAwesomeIcon
                            className="my-auto ps-2"
                            icon={generateSortingIcon(sortingState.name.sort)}
                            onClick={(): void => {
                                setIsSorting(true);
                                sortingDispatch({ type: "name" });
                            }}
                            role="button"
                        />
                    </div>
                </ListGroup.Item>
                <ListGroup.Item
                    className={`${styles.course_data_table_header_credits}`}
                >
                    <div className="d-flex flex-row">
                        <span>{"Credits"}</span>
                        <FontAwesomeIcon
                            className="my-auto ps-2"
                            icon={generateSortingIcon(
                                sortingState.credits.sort,
                            )}
                            onClick={(): void => {
                                setIsSorting(true);
                                sortingDispatch({ type: "credits" });
                            }}
                            role="button"
                        />
                    </div>
                </ListGroup.Item>
                <ListGroup.Item
                    className={`${styles.course_data_table_header_description}`}
                >
                    <div className="d-flex flex-row">
                        <span>{"Description"}</span>
                        <FontAwesomeIcon
                            className="my-auto ps-2"
                            icon={generateSortingIcon(
                                sortingState.description.sort,
                            )}
                            onClick={(): void => {
                                setIsSorting(true);
                                sortingDispatch({
                                    type: "description",
                                });
                            }}
                            role="button"
                        />
                    </div>
                </ListGroup.Item>
                <ListGroup.Item
                    className={`${styles.course_data_table_header_pre_requisites}`}
                >
                    <div className="d-flex flex-row">
                        <span>{"Pre Requisites"}</span>
                        <FontAwesomeIcon
                            className="my-auto ps-2"
                            icon={generateSortingIcon(
                                sortingState.preRequisites.sort,
                            )}
                            onClick={(): void => {
                                setIsSorting(true);
                                sortingDispatch({
                                    type: "preRequisites",
                                });
                            }}
                            role="button"
                        />
                    </div>
                </ListGroup.Item>
                <ListGroup.Item
                    className={`${styles.course_data_table_header_breadth_requirements}`}
                >
                    <div className="d-flex flex-row">
                        <span>{"Breadth Requirements"}</span>
                        <FontAwesomeIcon
                            className="my-auto ps-2"
                            icon={generateSortingIcon(
                                sortingState.breadthRequirements.sort,
                            )}
                            onClick={(): void => {
                                setIsSorting(true);
                                sortingDispatch({
                                    type: "breadthRequirements",
                                });
                            }}
                            role="button"
                        />
                    </div>
                </ListGroup.Item>
            </ListGroup>
            <div className={`border mx-auto ${styles.course_data_table}`}>
                {segmentedCourses[page].map((eachCourse: Course, _ind) => (
                    <ListGroup
                        className={styles.course_data_table_row}
                        horizontal
                        key={`course-${eachCourse.id}`}
                    >
                        <ListGroup.Item
                            className={`${styles.course_data_table_id}`}
                            variant={
                                _ind % CONSTANTS.EVEN_DIVISIBLE ===
                                CONSTANTS.MOD_EVEN
                                    ? "light"
                                    : "dark"
                            }
                        >
                            {eachCourse.id.split(" ")[CONSTANTS.ID_INDEX]}
                        </ListGroup.Item>
                        <ListGroup.Item
                            className={`${styles.course_data_table_name}`}
                            variant={
                                _ind % CONSTANTS.EVEN_DIVISIBLE ===
                                CONSTANTS.MOD_EVEN
                                    ? "light"
                                    : "dark"
                            }
                        >
                            {eachCourse.name.split(" - ")[CONSTANTS.NAME_INDEX]}
                        </ListGroup.Item>
                        <ListGroup.Item
                            className={`${styles.course_data_table_credits}`}
                            variant={
                                _ind % CONSTANTS.EVEN_DIVISIBLE ===
                                CONSTANTS.MOD_EVEN
                                    ? "light"
                                    : "dark"
                            }
                        >
                            {eachCourse.credits}
                        </ListGroup.Item>
                        <ListGroup.Item
                            className={`${styles.course_data_table_description}`}
                            variant={
                                _ind % CONSTANTS.EVEN_DIVISIBLE ===
                                CONSTANTS.MOD_EVEN
                                    ? "light"
                                    : "dark"
                            }
                        >
                            {eachCourse.description ? (
                                truncateCourseDescription(
                                    eachCourse.description,
                                    CONSTANTS.DESCRIPTION_LENGTH,
                                )
                            ) : (
                                <span className="fw-light">
                                    {"No Description"}
                                </span>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item
                            className={`${styles.course_data_table_pre_requisites}`}
                            variant={
                                _ind % CONSTANTS.EVEN_DIVISIBLE ===
                                CONSTANTS.MOD_EVEN
                                    ? "light"
                                    : "dark"
                            }
                        >
                            {eachCourse.preRequisites === "" ? (
                                <span className="fw-light">
                                    {"No Pre-Requisites"}
                                </span>
                            ) : (
                                eachCourse.preRequisites
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item
                            className={`${styles.course_data_table_breadth_requirements}`}
                            variant={
                                _ind % CONSTANTS.EVEN_DIVISIBLE ===
                                CONSTANTS.MOD_EVEN
                                    ? "light"
                                    : "dark"
                            }
                        >
                            {eachCourse.breadthRequirements === "" ? (
                                <span className="fw-light">
                                    {"No Breadth Satisfaction"}
                                </span>
                            ) : (
                                eachCourse.breadthRequirements
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                ))}
            </div>
            <Pagination className="w-50 mx-auto d-flex flex-row justify-content-center">
                {segmentedCourses.map((_, i) => (
                    <Pagination.Item
                        active={page === i}
                        // eslint-disable-next-line react/no-array-index-key -- fine for pagination
                        key={`pagination-${i}`}
                        onClick={(): void => {
                            setPage(i);
                        }}
                    >
                        {i}
                    </Pagination.Item>
                ))}
            </Pagination>
        </>
    );
};
