import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const container = document.getElementById("root");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- not necessary
const root = createRoot(container!);
// eslint-disable-next-line jest/require-hook -- not necessary
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
