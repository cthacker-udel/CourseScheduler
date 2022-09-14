/* eslint-disable @typescript-eslint/no-explicit-any -- needed for generic type structure of MultiSelect */
import React from "react";
import type { MultiSelectProviderFunctionalProperties } from "src/@types";
import type { iMultiSelectContext } from "src/@types/context/MultiSelect/iMultiSelectContext";
import { MultiSelectContext } from "src/context/MultiSelectContext/MultiSelectContext";

type MultiSelectProviderProperties = {
    children: JSX.Element;
    multiSelectItems: any;
};

/**
 * This is a provider for accessing the items selected in the MultiSelect, without using a functional prop that will be
 * risky to use
 *
 * @param props - The properties of the MultiSelectProvider
 * @param props.children - The children of the component
 * @param props.multiSelectItems - The items we are passing into the multiselect
 */
export const MultiSelectProvider = ({
    children,
    multiSelectItems,
}: MultiSelectProviderProperties): JSX.Element => {
    const [items, setItems] = React.useState(multiSelectItems);
    const [selectedItems, setSelectedItems] = React.useState([]);

    const functionalProperties = React.useMemo(
        (): MultiSelectProviderFunctionalProperties => ({
            setItems: (newItems: any): void => {
                setItems(newItems);
            },
            setSelectedItems: (newItems: any): void => {
                setSelectedItems(newItems);
            },
        }),
        [],
    );

    const memoizedValue = React.useMemo(
        (): iMultiSelectContext => ({
            ...functionalProperties,
            items,
            selectedItems,
        }),
        [functionalProperties, items, selectedItems],
    );

    return (
        <MultiSelectContext.Provider value={memoizedValue}>
            {children}
        </MultiSelectContext.Provider>
    );
};
