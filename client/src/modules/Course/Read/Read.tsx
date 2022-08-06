/* eslint-disable @typescript-eslint/indent -- prettier - eslint errors */
import chunk from "lodash.chunk";
import React from "react";
import { Pagination, Table } from "react-bootstrap";
import type { Course } from "src/@types";
import { truncateCourseDescription } from "src/helpers";
import { useCourses } from "src/hooks/useCourses";

const CONSTANTS = {
    DESCRIPTION_LENGTH: 75,
    DEFAULT_PAGE: 0,
    DEFAULT_PAGE_SIZE: 10,
    ID_INDEX: 1,
    NAME_INDEX: 1,
};

/**
 * General component for viewing courses
 */
export const Read = (): JSX.Element => {
    const { courses } = useCourses({ section: "CISC" });
    const [pageSize, setPageSize] = React.useState<number>(
        CONSTANTS.DEFAULT_PAGE_SIZE,
    );
    const [page, setPage] = React.useState<number>(CONSTANTS.DEFAULT_PAGE);
    const segmentedCourses = React.useMemo(
        () => chunk(courses, pageSize),
        [pageSize, courses],
    );

    return (
        <div className="h-100 d-flex flex-column justify-content-center align-items-center">
            <Table bordered className="w-75 mx-auto" hover striped>
                <thead>
                    <tr>
                        <th>{"ID"}</th>
                        <th>{"Name"}</th>
                        <th>{"Credits"}</th>
                        <th>{"Description"}</th>
                        <th>{"Pre Requisites"}</th>
                        <th>{"Breadth Requirements"}</th>
                    </tr>
                </thead>
                <tbody>
                    {segmentedCourses[page].map((eachCourse: Course) => (
                        <tr key={`course-${eachCourse.id}`}>
                            <td className="align-middle">
                                {eachCourse.id.split(" ")[CONSTANTS.ID_INDEX]}
                            </td>
                            <td className="align-middle">
                                {
                                    eachCourse.name.split(" - ")[
                                        CONSTANTS.NAME_INDEX
                                    ]
                                }
                            </td>
                            <td className="text-center align-middle">
                                {eachCourse.credits}
                            </td>
                            <td className="align-middle">
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
                            </td>
                            <td className="align-middle">
                                {eachCourse.prereqs ? (
                                    eachCourse.prereqs
                                ) : (
                                    <span className="fw-light">
                                        {"No Pre-Requisites"}
                                    </span>
                                )}
                            </td>
                            <td className="align-middle">
                                {eachCourse.ubreadth ? (
                                    eachCourse.ubreadth
                                ) : (
                                    <span className="fw-light">
                                        {"No Breadth Satisfaction"}
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination>
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
        </div>
    );
};
