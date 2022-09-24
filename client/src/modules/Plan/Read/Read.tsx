/* eslint-disable no-magic-numbers -- not needed */
/* eslint-disable no-unused-vars -- disabled for now */
/* eslint-disable @typescript-eslint/indent -- prettier - eslint errors */

import chunk from "lodash.chunk";
import React from "react";
import type { ServerSidePlan } from "src/@types";
import { CoursePagination } from "src/common";
import { truncateText } from "src/helpers";
import { useAllPlans } from "src/hooks/Plans/useAllPlans";

import _styles from "./Read.module.css";

/**
 * General component for viewing courses
 */
export const Read = (): JSX.Element => {
    const { plans } = useAllPlans();
    const [currentPage, setCurrentPage] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(5);
    const pages = chunk(plans, pageSize);

    console.log(plans);

    return (
        <div className="h-100 d-flex flex-column">
            <div className="w-75 mx-auto">
                <div className="text-center w-25 mx-auto fw-bold pb-2 bg-primary bg-opacity-25 mt-4 rounded fs-4">
                    {"Plan Table"}
                </div>
                <div className="d-flex flex-column">
                    <div className="d-flex flex-row justify-content-between mt-5 mb-3 bg-dark bg-opacity-25 rounded p-2">
                        <div
                            className={`${_styles.table_header} text-center fw-bold fs-5`}
                        >
                            {"Name"}
                        </div>
                        <div
                            className={`${_styles.table_header} text-center fw-bold fs-5`}
                        >
                            {"Semesters"}
                        </div>
                    </div>
                    {plans?.map((eachPlan: ServerSidePlan) => (
                        <div
                            className="d-flex flex-row justify-content-between border rounded"
                            key={eachPlan.name}
                        >
                            <div
                                className={`${_styles.table_row} text-center p-2 border border-top-0 border-start-0 border-bottom-0`}
                            >
                                {truncateText(eachPlan.name)}
                            </div>
                            <div
                                className={`${_styles.table_row} text-center p-2`}
                            >
                                {JSON.stringify(eachPlan.semesters)}
                            </div>
                        </div>
                    ))}
                    <div className="mt-5">
                        <CoursePagination
                            currentPage={currentPage}
                            moveToPage={(pageNumber: number): void => {
                                setCurrentPage(pageNumber);
                            }}
                            pagesCount={pages.length}
                            paginationSize="lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
