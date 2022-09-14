import React from "react";
import type { iMultiSelectContext } from "src/@types/context/MultiSelect/iMultiSelectContext";
import { MultiSelectContextInitialState } from "src/data/MultiSelect/MultiSelectContextInitialState";

export const MultiSelectContext = React.createContext<iMultiSelectContext>(
    MultiSelectContextInitialState,
);
