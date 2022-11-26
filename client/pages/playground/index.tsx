/* eslint-disable react/no-multi-comp -- disabled, no multiple definitions */
import React from "react";
import { Playground } from "src/common";
import { DynamicTable } from "src/common/components/Prototypes/DynamicTable";
import type {
    DynamicTableRow,
    DynamicTableRowCellDisplayFunctionProperties,
} from "src/common/components/Prototypes/DynamicTable/DynamicTable";

type User = {
    firstName: string;
    lastName: string;
    dob: string;
    age: number;
    location: string;
    zip: string;
};

const mockItems: User[] = [
    {
        age: 20,
        dob: new Date(1990, 10, 30).toUTCString(),
        firstName: "Jack",
        lastName: "Doorsey",
        location: "Newark, NJ",
        zip: "19653",
    },
    {
        age: 30,
        dob: new Date(2000, 11, 31).toUTCString(),
        firstName: "Cameron",
        lastName: "Thacker",
        location: "The Docks",
        zip: "19711",
    },
];

/**
 *
 * @param user
 * @returns
 */
const generateTableRow = (user: User): DynamicTableRow<User> => ({
    cells: [
        {
            displayFunction: (
                injectedProperties: DynamicTableRowCellDisplayFunctionProperties,
            ) => <div {...injectedProperties}>{user.firstName}</div>,
            title: user.firstName,
        },
        {
            displayFunction: (
                injectedProperties: DynamicTableRowCellDisplayFunctionProperties,
            ) => <div {...injectedProperties}>{user.lastName}</div>,
            title: user.firstName,
        },
        {
            displayFunction: (
                injectedProperties: DynamicTableRowCellDisplayFunctionProperties,
            ) => <div {...injectedProperties}>{user.dob}</div>,
            title: user.dob,
        },
        {
            displayFunction: (
                injectedProperties: DynamicTableRowCellDisplayFunctionProperties,
            ) => <div {...injectedProperties}>{String(user.age)}</div>,
            title: String(user.age),
        },
        {
            displayFunction: (
                injectedProperties: DynamicTableRowCellDisplayFunctionProperties,
            ) => <div {...injectedProperties}>{user.location}</div>,
            title: user.location,
        },
        {
            displayFunction: (
                injectedProperties: DynamicTableRowCellDisplayFunctionProperties,
            ) => <div {...injectedProperties}>{user.zip}</div>,
            title: user.zip,
        },
    ],
});
const mockColumnDefs = [
    { title: "First Name" },
    { title: "Last Name" },
    { title: "DOB" },
    { title: "Age" },
    { title: "Location" },
    { title: "Zip" },
];

/**
 *
 * @returns - The current playground instance
 */
const PlaygroundPage = (): JSX.Element => (
    <Playground>
        <DynamicTable<User>
            columns={mockColumnDefs}
            itemRowGenerator={generateTableRow}
            items={mockItems}
        />
    </Playground>
);

export { PlaygroundPage as default };
