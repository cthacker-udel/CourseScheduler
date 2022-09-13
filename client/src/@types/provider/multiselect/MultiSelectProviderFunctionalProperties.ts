/* eslint-disable @typescript-eslint/no-explicit-any -- required for MultiSelect implementation */

export type MultiSelectProviderFunctionalProperties = {
    setItems: (_items: any) => void;
    setSelectedItems: (_items: any) => void;
};
