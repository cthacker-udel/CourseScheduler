import React from "react";
import { Alert, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import type { Semester } from "src/@types";
import { MultiSelect } from "src/common/components/MultiSelect";
import semesters from "src/data/mockData/semester.json";

import { TEXT } from "./CreateConstants";

/**
 * Component for creating a plan
 *
 * @returns Create Plan Component
 */
export const Create = (): JSX.Element => {
    const { formState, register } = useForm({
        criteriaMode: "all",
        defaultValues: {
            name: "",
            semesters: [],
        },
        mode: "onSubmit",
        reValidateMode: "onChange",
    });
    const semester = semesters as Semester[];
    const [selectedSemesters, setSelectedSemesters] = React.useState<number[]>(
        [],
    );

    React.useEffect(() => {
        console.log("semesters = ", selectedSemesters);
    }, [selectedSemesters]);

    const { errors } = formState;

    return (
        <div className="d-flex flex-row h-100 w-50 mx-auto align-items-center justify-content-center">
            <div className="d-flex flex-column">
                <Alert className="rounded mb-2" variant="primary">
                    {TEXT.header}
                </Alert>
                <hr />
                <Form className="shadow p-3">
                    <div className="fw-bold fs-5 text-center border-bottom w-25 mx-auto">
                        {TEXT.formTitle}
                    </div>
                    <Form.Group className="mt-4" controlId="name-form">
                        <Form.Label className="fw-bold">
                            {TEXT.nameFormTitle}
                        </Form.Label>
                        <Form.Control type="text" {...register("name")} />
                    </Form.Group>
                    <Form.Group className="mt-4" controlId="semester-form">
                        <Form.Label className="fw-bold">
                            {TEXT.semesterFormTitle}
                        </Form.Label>
                        <MultiSelect
                            caret
                            displayItemField="title"
                            items={semester}
                            parentClassName="w-75 mx-auto"
                            pushSelectedItems={(indexes: number[]): void => {
                                setSelectedSemesters(indexes);
                            }}
                        />
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
};
