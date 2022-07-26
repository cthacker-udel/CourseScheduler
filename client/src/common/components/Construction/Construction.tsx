import { faHelmetSafety, faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React from "react";
import { Button } from "react-bootstrap";

/**
 * Constants for the construction component
 */
const CONSTRUCTION_CONSTANTS = {
    BUTTON_TEXT: "Return to page",
};

/**
 * Common page for if a feature is currently under construction
 *
 * @returns The construction page
 */
export const Construction = (): JSX.Element => {
    const router = useRouter();
    return (
        <div className="d-flex flex-column align-items-center h-100 w-100 justify-content-center">
            <span>
                <div className="fw-bold fs-3 pb-2 d-flex flex-row">
                    <FontAwesomeIcon
                        className="my-auto me-2"
                        icon={faWrench}
                        size="1x"
                    />
                    <div className="my-auto">
                        {"Currently under construction"}
                    </div>
                    <FontAwesomeIcon
                        className="my-auto ms-2"
                        icon={faWrench}
                        size="1x"
                    />
                </div>
                <div className="d-flex flex-row justify-content-center">
                    <FontAwesomeIcon icon={faHelmetSafety} shake size="5x" />
                </div>
                <div className="d-flex flex-row justify-content-center pt-4">
                    <Button
                        onClick={(): void => {
                            router.back();
                        }}
                        variant="outline-secondary"
                    >
                        {CONSTRUCTION_CONSTANTS.BUTTON_TEXT}
                    </Button>
                </div>
            </span>
        </div>
    );
};
