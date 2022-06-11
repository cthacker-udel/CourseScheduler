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
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

import styles from "./HomePage.module.css";

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
    const intl = useIntl();
    const navigate = useNavigate();
    const accordionOptions = intl
        .formatMessage({ id: "accordion_options" })
        .split("\n");
    const accordionDescriptions = intl
        .formatMessage({
            id: "accordion_descriptions",
        })
        .split("\n");
    const accordionItems = accordionDescriptions.map(
        (eachDescription, index: number) => (
            <Accordion.Item eventKey={`${index}`} key={`${eachDescription}`}>
                <Accordion.Header>
                    <h5 className="m-0">{accordionOptions[index]}</h5>
                </Accordion.Header>
                <Accordion.Body>{eachDescription}</Accordion.Body>
            </Accordion.Item>
        ),
    );
    return (
        <Container className="d-flex flex-column justify-content-center mt-4">
            <div className="mb-3 mt-3">
                <h1
                    className={`text-center text-wrap font-weight-bold text-decoration-underline ${styles.header}`}
                >
                    <FormattedMessage id="header" />
                </h1>
            </div>
            <div className="mb-5">
                <h3
                    className={`text-muted text-center text-wrap font-weight-light ${styles.sub_header}`}
                >
                    <FormattedMessage
                        id="created_by"
                        values={{
                            name1: "Cameron Thacker",
                        }}
                    />
                </h3>
            </div>
            <Card bg="light" border="primary" className={`${styles.body}`}>
                <Card.Body>
                    <Card.Title className="text-center mt-2 mb-4">
                        <FormattedMessage id="card_title" />
                    </Card.Title>
                    <Accordion className="m-2" defaultActiveKey="-1">
                        {accordionItems}
                    </Accordion>
                </Card.Body>
                <Card.Footer className="text-center">
                    <Button
                        className="m-2"
                        onClick={(): void => {
                            navigate("/login");
                        }}
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
                        onClick={(): void => {
                            navigate("/sign-up");
                        }}
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
