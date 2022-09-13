/* eslint-disable @typescript-eslint/no-explicit-any -- needed for generic type structure of MultiSelect */
import React from "react";
import { MultiSelectProviderFunctionalProperties } from "src/@types";

type MultiSelectProviderProperties = {
    children: JSX.Element;
    multiSelectItems: any[] | any;
};

/**
 * This is a provider for accessing the items selected in the MultiSelect, without using a functional prop that will be
 * risky to use
 *
 * @param props - The properties of the MultiSelectProvider
 * @param props.children - The children of the component
 * @param props.multiSelectItems - The items we are passing into the multiselect
 */
export const MultiSelectProvider = ({ children, multiSelectItems }) => {
    const [items, setItems] = React.useState(multiSelectItems);
    const [selectedItems, setSelectedItems] = React.useState([]);

    const functionalProperties = React.useMemo(
        () => (): MultiSelectProviderFunctionalProperties => ({
            setItems: (newItems: any): void => {
                setItems(newItems);
            },
            setSelectedItems: (newItems: any): void => {
                setSelectedItems(newItems);
            },
        }),
        [],
    );
};
