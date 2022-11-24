import React from "react";
import { Playground } from "src/common";
import { DynamicTable } from "src/common/components/Prototypes/DynamicTable";

const mockItems: string[] = ["Hello", "There", "These", "Are", "Mock", "Items"];
const mockColumnDefs = [
    { title: "Hello" },
    { title: "There" },
    { title: "These" },
    { title: "Are" },
    { title: "Mock" },
    { title: "items" },
];

/**
 *
 * @returns - The current playground instance
 */
const PlaygroundPage = (): JSX.Element => (
    <Playground>
        <DynamicTable<string> columns={mockColumnDefs} items={mockItems} />
    </Playground>
);

export { PlaygroundPage as default };
