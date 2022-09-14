/* eslint-disable @typescript-eslint/no-explicit-any -- required for generic structure of MultiSelect */
/* eslint-disable unicorn/prevent-abbreviations -- i stands for interface not index */
export type iMultiSelectContext = {
    items: any;
    selectedItems: any;
    setItems: (_items: any) => void;
    setSelectedItems: (_items: any) => void;
};
