/* eslint-disable jest/require-hook -- disabled for file, does not apply to jest */
import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

document.body.classList.add("overflow-hidden");
const container = document.getElementById("root");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- not necessary
const root = createRoot(container!);
root.render(<App />);
