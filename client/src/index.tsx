import ReactDOM from "react-dom";
import React from "react";
import { App } from "./App";

const root = document.getElementById("root");
if (!root) {
    throw new Error("Unable to get root");
}

ReactDOM.render(<App />, root);
