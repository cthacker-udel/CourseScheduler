import React from "react";
import ReactDOM from "react-dom";
import { IntlProvider } from "react-intl";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import homeMessages from "./locale/en/home.json";
import Layout from "./modules/common/components/Layout";
import HomePage from "./modules/Home/HomePage";
import LoginPage from "./modules/LoginPage";

/**
 * @summary The App component takes in no props, and comprises of the router logic
 * @returns {JSX.Element} App component
 */
const App = (): JSX.Element => (
    <BrowserRouter window={window}>
        <IntlProvider defaultLocale="en" locale="en" messages={homeMessages}>
            <Routes>
                <Route element={<Layout />} path="/">
                    <Route element={<LoginPage />} path="login" />
                    <Route element={<HomePage />} index />
                    {/* <Route path="plan" element={<Plans />}>
                        <Route path=":planId" element={<Plan />} />
                        <Route path="new" element={<NewPlan />} />
                    </Route>
                    <Route path="semester" element={<Semesters />}>
                        <Route path=":semesterId" element={<Semester />} />
                        <Route path="new" element={<NewSemester />} />
                    </Route>
                    <Route path="courses" element={<Courses />}>
                        <Route path=":courseId" element={<Course />} />
                        <Route path="new" element={<NewCourse />} />
                    </Route>
                    <Route path="import" element={<ImportPage />}>
                        <Route path="new" element={<NewImport />} />
                    </Route>
                    <Route path="export" element={<Exports />}>
                        <Route path="new" element={<NewExport />} />
                    </Route> */}
                </Route>
            </Routes>
        </IntlProvider>
    </BrowserRouter>
);

// eslint-disable-next-line jest/require-hook -- Not a jest test
ReactDOM.render(<App />, document.getElementById("root"));

export default App;
