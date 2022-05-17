import React from "react";
import { Accordion, Card, Container } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import Layout from "../../common/components/Layout";

export const HomePage = () => (
    <Layout>
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
            </Card>
        </Container>
    </Layout>
);
