import {
    faRightToBracket,
    faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React from "react";
import {
    Accordion,
    Button,
    Card,
    Container,
    OverlayTrigger,
} from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";
import { generateTooltipIntl } from "src/helpers";
import { Logger } from "src/log/Logger";

import styles from "./HomePage.module.css";

/**
 * @summary Home Page component, comprises of the page the user sees when they first log in
 * @returns {JSX.Element} Home Page component
 */
const HomePage = (): JSX.Element => {
    const loginReference = React.useRef(null);
    const signUpReference = React.useRef(null);
    const router = useRouter();
    const intl = useIntl();
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

    React.useEffect(() => {
        /**
         * Pre-fetches all necessary routes
         */
        const preFetchRoutes = async (): Promise<void> => {
            await router.prefetch("/login");
            await router.prefetch("/sign-up");
        };
        preFetchRoutes()
            .then(() => {
                Logger.log("info", "routes prefetched");
            })
            .catch((error) => {
                Logger.log("info", error);
            });
    }, [router]);

    return (
        <Container className="d-flex flex-column justify-content-center">
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
                    <OverlayTrigger
                        key="login-trigger"
                        overlay={(properties): JSX.Element =>
                            generateTooltipIntl("tooltip", properties, {
                                type: "Log In",
                            })
                        }
                        placement="left"
                    >
                        <Button
                            className="m-2"
                            onClick={async (): Promise<void> => {
                                await router.push("/login");
                            }}
                            ref={loginReference}
                            variant="outline-primary"
                        >
                            <FontAwesomeIcon icon={faRightToBracket} />
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        key="sign-up-overlaytrigger"
                        overlay={(properties): JSX.Element =>
                            generateTooltipIntl("tooltip", properties, {
                                type: "Sign Up",
                            })
                        }
                        placement="right"
                    >
                        <Button
                            className="m-2"
                            onClick={async (): Promise<void> => {
                                await router.push("/sign-up");
                            }}
                            ref={signUpReference}
                            variant="outline-primary"
                        >
                            <FontAwesomeIcon icon={faUserPlus} />
                        </Button>
                    </OverlayTrigger>
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default HomePage;
