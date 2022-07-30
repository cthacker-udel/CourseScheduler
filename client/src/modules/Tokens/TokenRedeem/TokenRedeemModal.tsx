import React from "react";
import { Modal } from "react-bootstrap";

const TOKEN_REDEEM_MODAL_CONSTANTS = {
    email: {
        confirm: "Confirm changes",
        label: "Redeem Email Token",
    },
    password: {
        confirm: "Confirm changes",
        label: "Redeem Password Token",
    },
    username: {
        confirm: "Confirm changes",
        label: "Redeem Username Token",
    },
};

type TokenType = "email" | "password" | "username";

type TokenRedeemModalProps = {
    type: TokenType;
    token: string;
};

/**
 * This modal serves as the update hub for changing the user's values if they use a token redemption.
 *
 * @param {TokenRedeemModalProps} props The type of token and the token itself
 */
export const TokenRedeemModal = ({
    type,
    token,
}: TokenRedeemModalProps): JSX.Element => {
    const [show, setShow] = React.useState<boolean>(true);

    return (
        <Modal
            onHide={(): void => {
                setShow(false);
            }}
            show={show}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {TOKEN_REDEEM_MODAL_CONSTANTS[type].label ??
                        "Unknown Token Type"}
                </Modal.Title>
            </Modal.Header>
        </Modal>
    );
};
