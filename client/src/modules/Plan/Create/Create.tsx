/* eslint-disable @typescript-eslint/no-floating-promises -- disabled for compliance with router */
/* eslint-disable no-magic-numbers -- trivial number, not needed to be constant */
import { useRouter } from "next/router";
import React from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { type FieldErrors, useForm } from "react-hook-form";
import type { ApiError, ApiSuccess } from "src/@types";
import { PlansApi } from "src/api/client-side/PlansApi";
import { PLAN_NAME } from "src/common";
import { MultiSelect } from "src/common/components/MultiSelect";
import { useNotificationContext } from "src/context/NotificationContext/useNotificationContext";
import { useAllSemesters } from "src/hooks/Semesters/useAllSemesters";
import { Logger } from "src/log/Logger";

import { TEXT } from "./CreateConstants";
import { CREATE_VALIDATION } from "./CreateValidation";

type FormData = {
    name: string;
    semesters: string[];
};

/**
 * Component for creating a plan
 *
 * @returns Create Plan Component
 */
export const Create = (): JSX.Element => {
    const router = useRouter();
    const { formState, handleSubmit, register, reset, setValue } =
        useForm<FormData>({
            criteriaMode: "all",
            defaultValues: {
                name: "",
                semesters: [],
            },
            mode: "all",
            reValidateMode: "onChange",
        });
    const { semesters } = useAllSemesters();
    const [selectedSemesters, setSelectedSemesters] = React.useState<number[]>(
        [],
    );
    const { addNotification } = useNotificationContext();

    const { errors, dirtyFields } = formState;

    /**
     * Submit handler, which allows for us to add specific behavior to the form submit action
     *
     * @param data - The form data being submitted
     * @param _event - The form submit event
     */
    const onSubmit = async (
        data: FormData,
        _event: React.BaseSyntheticEvent | undefined,
    ): Promise<void> => {
        try {
            const result = await PlansApi.addPlan(data);
            if ((result as ApiSuccess)?.status === 204) {
                addNotification({
                    message: {
                        body: `Your plan ${data.name} has been created!`,
                        header: "Plan Creation Success!",
                    },
                    variant: "success",
                });
                reset();
                setSelectedSemesters([]);
                router.push("/dashboard/plan");
            }
        } catch (error: unknown) {
            if ((error as ApiError) === undefined) {
                Logger.log(
                    "error",
                    `Error creating plan, ${(error as Error).message}, stack: ${
                        (error as Error).stack
                    }`,
                );
                addNotification({
                    message: {
                        body: "An error occurred on our end, please wait and try again later. All error logs are being sent to the developer.",
                        header: "Plan Creation Failed - Unknown Error",
                    },
                    variant: "danger",
                });
            } else {
                addNotification({
                    message: {
                        body: "Plan creation has failed, re-evaluate whether you entered in the correct data, and try again.",
                        header: "Plan Creation Failed",
                    },
                    variant: "danger",
                });
            }
        }
    };

    /**
     * Submit handler for when errors are present in submitted form, allows us to add specific behavior to this type of situation
     *
     * @param errors - The errors present in the form
     * @param event - The form submit event
     */
    const onError = (
        fieldErrors: FieldErrors<FormData>,
        _event: React.BaseSyntheticEvent | undefined,
    ): void => {
        Logger.log(
            "error",
            `Error creating plan: ${fieldErrors.name} ${fieldErrors.semesters}`,
            "Create.tsx",
            58,
        );
    };

    React.useEffect(() => {
        if (semesters?.length) {
            setValue(
                "semesters",
                semesters
                    .filter((_, ind) => selectedSemesters.includes(ind))
                    .map((eachSemester) => eachSemester.id),
                { shouldDirty: true },
            );
        }
    }, [semesters, selectedSemesters, setValue]);

    return (
        <div className="d-flex flex-row h-100 w-50 mx-auto align-items-center justify-content-center">
            <div className="d-flex flex-column">
                <Alert className="rounded mb-2" variant="primary">
                    {TEXT.header}
                </Alert>
                <hr />
                <Form
                    className="shadow p-3"
                    onSubmit={handleSubmit(onSubmit, onError)}
                >
                    <div className="fw-bold fs-5 text-center border-bottom w-25 mx-auto">
                        {TEXT.formTitle}
                    </div>
                    <div className="shadow p-3 rounded border mt-5">
                        <Form.Group
                            className="mt-4 w-75 mx-auto"
                            controlId="name-form"
                        >
                            <Form.Label className="fw-bold text-center w-100">
                                {TEXT.nameFormTitle}
                            </Form.Label>
                            <Form.Control
                                isInvalid={
                                    Object.keys(errors).length > 0 &&
                                    dirtyFields?.name
                                }
                                isValid={
                                    Object.keys(errors).length === 0 &&
                                    dirtyFields?.name
                                }
                                type="text"
                                {...register("name", {
                                    maxLength: {
                                        message:
                                            CREATE_VALIDATION.NAME.MESSAGES
                                                .invalid.maxLength,
                                        value: CREATE_VALIDATION.NAME.VALUES
                                            .maxLength,
                                    },
                                    minLength: {
                                        message:
                                            CREATE_VALIDATION.NAME.MESSAGES
                                                .invalid.minLength,
                                        value: CREATE_VALIDATION.NAME.VALUES
                                            .minLength,
                                    },
                                    pattern: {
                                        message:
                                            CREATE_VALIDATION.NAME.MESSAGES
                                                .invalid.pattern,
                                        value: PLAN_NAME,
                                    },
                                })}
                            />
                            {errors?.name?.message && dirtyFields?.name && (
                                <Form.Control.Feedback type="invalid">
                                    {errors.name.message}
                                </Form.Control.Feedback>
                            )}
                            {!errors?.name?.message && dirtyFields?.name && (
                                <Form.Control.Feedback type="valid">
                                    {CREATE_VALIDATION.NAME.MESSAGES.valid}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                        <Form.Group className="mt-4" controlId="semester-form">
                            <Form.Label className="fw-bold text-center w-100">
                                {TEXT.semesterFormTitle}
                            </Form.Label>
                            <MultiSelect
                                caret
                                displayItemField="name"
                                items={semesters}
                                parentClassName="w-75 mx-auto"
                                pushSelectedItems={(
                                    indexes: number[],
                                ): void => {
                                    setSelectedSemesters(indexes);
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mt-4 d-flex flex-row justify-content-center">
                            <Button
                                className="w-25 rounded-pill"
                                disabled={
                                    !dirtyFields.name ||
                                    !dirtyFields.semesters ||
                                    !!errors.name ||
                                    !!errors.semesters
                                }
                                type="submit"
                                variant={
                                    !dirtyFields.name ||
                                    !dirtyFields.semesters ||
                                    !!errors.name ||
                                    !!errors.semesters
                                        ? "outline-primary"
                                        : "primary"
                                }
                            >
                                {TEXT.submitButtonText}
                            </Button>
                        </Form.Group>
                    </div>
                </Form>
            </div>
        </div>
    );
};
