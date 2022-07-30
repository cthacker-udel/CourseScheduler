import React from "react";
import { Modal } from "react-bootstrap";
import type { ForgotTokenType } from "src/@types";

import { TokenUsernameRedeemModal } from "./TokenUsernameRedeemModal/TokenUsernameRedeemModal";

type TokenRedeemModalProps = {
    close: () => void;
    type: ForgotTokenType;
    token: string;
};

/**
 * Utility function generating the proper modal based off the type, and passing the token into the proper modal
 *
 * @param type - The type of token
 * @param token - The token itself
 * @returns The respective token modal according to the ForgotTokenType passed in
 */
const generateTokenModal = (
    type: ForgotTokenType,
    token: string,
): JSX.Element => {
    switch (type) {
        case "email": {
            return <TokenUsernameRedeemModal token={token} />;
        }
        case "username": {
            return <TokenUsernameRedeemModal token={token} />;
        }
        case "password": {
            return <TokenUsernameRedeemModal token={token} />;
        }
        default: {
            return <TokenUsernameRedeemModal token={token} />;
        }
    }
};

/**
 * This modal serves as the update hub for changing the user's values if they use a token redemption.
 *
 * @param {TokenRedeemModalProps} props The type of token and the token itself
 */
export const TokenRedeemModal = ({
    close,
    type,
    token,
}: TokenRedeemModalProps): JSX.Element => (
    <Modal
        onHide={(): void => {
            close();
        }}
        show
    >
        {generateTokenModal(type, token)}
    </Modal>
);
