import type { GridColDef } from "@mui/x-data-grid";

/**
 * Utility function for generating the data grid columns for the course object
 *
 * @returns The data grid columns for the course table
 */
export const generateDataGridColumnsCourse = (): GridColDef[] => [
    {
        field: "breadthRequirements",
        headerName: "Breadth Requirements",
        width: 260,
    },
    { field: "courseSection", headerName: "Title", width: 100 },
    { field: "credits", headerName: "Credits", type: "number", width: 100 },
    { field: "description", headerName: "Description", width: 500 },
    { field: "name", headerName: "Name", width: 260 },
    { field: "preRequisites", headerName: "Pre-Requisites", width: 260 },
];
