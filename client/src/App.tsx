import React from "react";
import ReactDOM from "react-dom";
import { IntlProvider } from "react-intl";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import homeMessages from "./locale/en/home.json";
import HomePage from "./modules/Home/HomePage";

export const App = () => (
    <BrowserRouter window={window}>
        <IntlProvider defaultLocale="en" locale="en" messages={homeMessages}>
            <Routes>
                <Route element={<HomePage />} index />
                <Route element={<HomePage />} path="home" />
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
            </Routes>
        </IntlProvider>
    </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById("root"));
