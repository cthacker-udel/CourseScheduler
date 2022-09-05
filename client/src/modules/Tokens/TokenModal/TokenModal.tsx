/* eslint-disable @typescript-eslint/indent -- indentation issues with nested ternaries that are unable to be fixed */
import { faCheck, faClipboard, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Modal, Placeholder } from "react-bootstrap";
import { useNotificationContext } from "src/context/NotificationContext/useNotificationContext";
import { copyTextToClipboard } from "src/helpers";

import styles from "./TokenModal.module.css";

type TokenModalHeaderTypes = "email" | "password" | "username";

type TokenModalProperties = {
    currentDate: Date;
    reset: () => void;
    token: string;
    type: TokenModalHeaderTypes;
    validUntil: Date;
};

type CopyStatus = {
    failed: boolean;
    pending: boolean;
};

const TOKEN_MODAL_CONSTANTS = {
    CLIPBOARD_TIMEOUT: 5000,
    INVALID_TOKEN_TEXT: "Invalid token, please generate a new one.",
    KEEP_TOKEN_SOMEWHERE_SAFE_WARNING:
        "Save your token somewhere safe, after you leave this page it will be gone.",
    MODAL_FOOTER_CONFIRM_TEXT: "Confirm Close Display",
    MODAL_FOOTER_NON_CONFIRM_TEXT: "Close Display",
    MODAL_HEADER_FIRST_HALF: "Forgot ",
    MODAL_HEADER_SECOND_HALF: " Token Display",
    TOKEN_SUBSTRING_END: 53,
    TOKEN_SUBSTRING_START: 0,
    TOKEN_TITLE: "Token",
};

/**
 * Modal for handling the display of the token and expiration date
 *
 * @param props The modal props, which have the token, and the validUntil date
 */
export const TokenModal = ({
    currentDate,
    reset,
    token,
    type,
    validUntil,
}: TokenModalProperties): JSX.Element => {
    const { addNotification } = useNotificationContext();
    const [show, setShow] = React.useState<boolean>(true);
    const [displayToken, setDisplayToken] = React.useState<boolean>(false);
    const [confirmClose, setConfirmClose] = React.useState<boolean>(false);
    const [copied, setCopied] = React.useState<CopyStatus>({
        failed: false,
        pending: true,
    });

    return (
        <Modal
            onHide={(): void => {
                setShow(false);
                reset();
            }}
            show={show}
        >
            {validUntil.getTime() > currentDate.getTime() ? (
                <>
                    <Modal.Header className="mx-auto">
                        <Modal.Title className="text-capitalize">
                            {TOKEN_MODAL_CONSTANTS.MODAL_HEADER_FIRST_HALF}
                            {type}
                            {TOKEN_MODAL_CONSTANTS.MODAL_HEADER_SECOND_HALF}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-wrap">
                        <div className="pb-3">
                            <div className="fw-bold text-center text-decoration-underline pb-1">
                                {TOKEN_MODAL_CONSTANTS.TOKEN_TITLE}
                            </div>
                            {displayToken ? (
                                <span className="d-flex flex-row">
                                    <code className="font-monospace bg-secondary bg-gradient bg-opacity-25">
                                        {`${token.slice(
                                            TOKEN_MODAL_CONSTANTS.TOKEN_SUBSTRING_START,
                                            TOKEN_MODAL_CONSTANTS.TOKEN_SUBSTRING_END,
                                        )}...`}
                                    </code>
                                    <div className="ps-2 text-center">
                                        <FontAwesomeIcon
                                            className={`p-1 ${
                                                copied.pending
                                                    ? "bg-success"
                                                    : copied.failed
                                                    ? "bg-danger"
                                                    : "bg-success"
                                            } bg-gradient bg-opacity-50 rounded opacity-75`}
                                            icon={
                                                copied.pending
                                                    ? faClipboard
                                                    : copied.failed
                                                    ? faX
                                                    : faCheck
                                            }
                                            onClick={(): void => {
                                                copyTextToClipboard(token)
                                                    .then(() => {
                                                        setCopied({
                                                            failed: false,
                                                            pending: false,
                                                        });
                                                        addNotification({
                                                            delay: 3000,
                                                            message: {
                                                                body: "Copied token to clipboard!",
                                                            },
                                                            variant: "success",
                                                        });
                                                        setTimeout(() => {
                                                            setCopied({
                                                                failed: false,
                                                                pending: true,
                                                            });
                                                        }, TOKEN_MODAL_CONSTANTS.CLIPBOARD_TIMEOUT);
                                                    })
                                                    .catch(() => {
                                                        setCopied({
                                                            failed: true,
                                                            pending: false,
                                                        });
                                                        addNotification({
                                                            delay: 3000,
                                                            message: {
                                                                body: "Failed to copy token to clipboard",
                                                            },
                                                            variant: "danger",
                                                        });
                                                    });
                                            }}
                                            role="button"
                                            size="lg"
                                        />
                                    </div>
                                </span>
                            ) : (
                                <span
                                    className="rounded"
                                    onClick={(): void => {
                                        setDisplayToken(true);
                                    }}
                                    role="button"
                                >
                                    <Placeholder.Button
                                        animation="wave"
                                        className="w-100 h-100 p-0"
                                        size="lg"
                                        variant="dark"
                                        xs={12}
                                    />
                                </span>
                            )}
                        </div>
                        <div
                            className={`text-muted text-center fw-light ${styles.save_token_text}`}
                        >
                            {
                                TOKEN_MODAL_CONSTANTS.KEEP_TOKEN_SOMEWHERE_SAFE_WARNING
                            }
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="d-flex flex-column justify-content-center">
                        <Button
                            onClick={(): void => {
                                if (confirmClose) {
                                    setShow(false);
                                    reset();
                                } else {
                                    setConfirmClose(true);
                                }
                            }}
                            variant={confirmClose ? "danger" : "primary"}
                        >
                            {confirmClose
                                ? TOKEN_MODAL_CONSTANTS.MODAL_FOOTER_CONFIRM_TEXT
                                : TOKEN_MODAL_CONSTANTS.MODAL_FOOTER_NON_CONFIRM_TEXT}
                        </Button>
                    </Modal.Footer>
                </>
            ) : (
                <Modal.Header>
                    <Modal.Title>
                        {TOKEN_MODAL_CONSTANTS.INVALID_TOKEN_TEXT}
                    </Modal.Title>
                </Modal.Header>
            )}
        </Modal>
    );
};
