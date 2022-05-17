import {
    faRightToBracket,
    faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
    Accordion,
    Button,
    Card,
    Container,
    Overlay,
    Tooltip,
} from "react-bootstrap";
import { FormattedMessage } from "react-intl";

type OverlayReducerActionType = "setLogin" | "setSignUp";

interface State {
    login: boolean;
    signUp: boolean;
}

interface OverlayReducerAction {
    type: OverlayReducerActionType;
    value: boolean;
}

/**
 * @summary Updates the overlays on the two buttons
 * @param state The state of the component
 * @param action The action the user is taking to update the component state
 * @returns {State} The current state of the application after changes have been made
 */
const OverlayReducer = (state: State, action: OverlayReducerAction): State => {
    switch (action.type) {
        case "setLogin": {
            return { ...state, login: action.value };
        }
        case "setSignUp": {
            return { ...state, signUp: action.value };
        }
        default:
            return state;
    }
};

/**
 * @summary Home Page component, comprises of the page the user sees when they first log in
 * @returns {JSX.Element} Home Page component
 */
export const HomePage = (): JSX.Element => {
    const loginRef = React.useRef(null);
    const signUpRef = React.useRef(null);
    const [state, dispatch] = React.useReducer(
        OverlayReducer,
        {},
        (): State => ({
            login: false,
            signUp: false,
        }),
    );
    return (
        <Container className="d-flex flex-column justify-content-center mt-4">
            <div className="mb-3 mt-3">
                <h1 className="text-center text-wrap font-weight-bold text-decoration-underline">
                    <FormattedMessage id="header" />
                </h1>
            </div>
            <div className="mb-5">
                <h3 className="text-muted text-center text-wrap font-weight-light">
                    <FormattedMessage
                        id="created_by"
                        values={{
                            name1: "Cameron Thacker",
                        }}
                    />
                </h3>
            </div>
            <Card bg="light" border="primary">
                <Card.Body>
                    <Card.Title className="text-center mt-2 mb-4">
                        <FormattedMessage id="card_title" />
                    </Card.Title>
                    <Accordion defaultActiveKey="-1">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                <h5 className="m-0">
                                    <FormattedMessage id="option_1" />
                                </h5>
                            </Accordion.Header>
                            <Accordion.Body>
                                <FormattedMessage id="option_1_desc" />
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>
                                <h5 className="m-0">
                                    <FormattedMessage id="option_2" />
                                </h5>
                            </Accordion.Header>
                            <Accordion.Body>
                                <FormattedMessage id="option_2_desc" />
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>
                                <h5 className="m-0">
                                    <FormattedMessage id="option_3" />
                                </h5>
                            </Accordion.Header>
                            <Accordion.Body>
                                <FormattedMessage id="option_3_desc" />
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>
                                <h5 className="m-0">
                                    <FormattedMessage id="option_4" />
                                </h5>
                            </Accordion.Header>
                            <Accordion.Body>
                                <FormattedMessage id="option_4_desc" />
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>
                                <h5 className="m-0">
                                    <FormattedMessage id="option_5" />
                                </h5>
                            </Accordion.Header>
                            <Accordion.Body>
                                <FormattedMessage id="option_5_desc" />
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Card.Body>
                <Card.Footer className="text-center">
                    <Button
                        className="m-2"
                        onMouseEnter={(): void => {
                            dispatch({ type: "setLogin", value: true });
                        }}
                        onMouseLeave={(): void => {
                            dispatch({ type: "setLogin", value: false });
                        }}
                        ref={loginRef}
                        variant="outline-primary"
                    >
                        <FontAwesomeIcon icon={faRightToBracket} />
                    </Button>
                    <Button
                        className="m-2"
                        onMouseEnter={(): void => {
                            dispatch({ type: "setSignUp", value: true });
                        }}
                        onMouseLeave={(): void => {
                            dispatch({ type: "setSignUp", value: false });
                        }}
                        ref={signUpRef}
                        variant="outline-primary"
                    >
                        <FontAwesomeIcon icon={faUserPlus} />
                    </Button>
                </Card.Footer>
            </Card>
            <Overlay
                placement="bottom"
                show={state.login}
                target={loginRef.current}
            >
                {(props): JSX.Element => (
                    <Tooltip id="login-tooltip" {...props}>
                        <FormattedMessage id="primary_button_text" />
                    </Tooltip>
                )}
            </Overlay>
            <Overlay
                placement="bottom"
                show={state.signUp}
                target={signUpRef.current}
            >
                {(props): JSX.Element => (
                    <Tooltip id="signup-tooltip" {...props}>
                        <FormattedMessage id="secondary_button_text" />
                    </Tooltip>
                )}
            </Overlay>
        </Container>
    );
};
