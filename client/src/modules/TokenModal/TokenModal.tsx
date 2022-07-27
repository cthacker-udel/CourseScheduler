import React from "react";
import { Button, Modal, Placeholder } from "react-bootstrap";

type TokenModalHeaderTypes = "email" | "password" | "username";

type TokenModalProps = {
    currentDate: Date;
    token: string;
    type: TokenModalHeaderTypes;
    validUntil: Date;
};

const TOKEN_MODAL_CONSTANTS = {
    KEEP_TOKEN_SOMEWHERE_SAFE_WARNING:
        "Save your token somewhere safe, after you leave this page it will be gone.",
    MODAL_FOOTER_CONFIRM_TEXT: "Confirm Close Display",
    MODAL_FOOTER_NON_CONFIRM_TEXT: "Close Display",
    MODAL_HEADER_FIRST_HALF: "Forgot ",
    MODAL_HEADER_SECOND_HALF: " Token Display",
};

/**
 * Modal for handling the display of the token and expiration date
 *
 * @param props The modal props, which have the token, and the validUntil date
 */
export const TokenModal = ({
    currentDate,
    token,
    type,
    validUntil,
}: TokenModalProps): JSX.Element => {
    const [show, setShow] = React.useState<boolean>(false);
    const [displayToken, setDisplayToken] = React.useState<boolean>(false);
    const [confirmClose, setConfirmClose] = React.useState<boolean>(false);

    return (
        <Modal
            onHide={(): void => {
                setShow(false);
            }}
            show={show}
        >
            {
                validUntil < currentDate ?
            
            <Modal.Header>
                <Modal.Title className="text-capitalize">
                    {TOKEN_MODAL_CONSTANTS.MODAL_HEADER_FIRST_HALF}
                    {type}
                    {TOKEN_MODAL_CONSTANTS.MODAL_HEADER_SECOND_HALF}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {displayToken ? (
                    token
                ) : (
                    <Placeholder
                        onClick={(): void => {
                            setDisplayToken(true);
                        }}
                        role="button"
                    />
                )}
                {displayToken && (
                    <div className="text-muted">
                        {
                            TOKEN_MODAL_CONSTANTS.KEEP_TOKEN_SOMEWHERE_SAFE_WARNING
                        }
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer className="d-flex flex-column justify-content-center">
                <Button
                    onClick={(): void => {
                        if (confirmClose) {
                            setShow(false);
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
        </Modal>
    );
};
