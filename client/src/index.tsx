import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const root = document.getElementById("root");
if (!root) {
    throw new Error("Unable to get root");
}

// eslint-disable-next-line jest/require-hook -- no hook needed
ReactDOM.render(<App />, root);
