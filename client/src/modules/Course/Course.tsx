/* eslint-disable react/jsx-no-useless-fragment -- just for testing*/
import React from "react";
import { Card } from "react-bootstrap";

/**
 * The course component, which will render each individual course
 * @returns {JSX.Element} The singular course
 */
export const Course = (): JSX.Element => {
    const x = 10;
    return (
        <Card>
            <Card.Body></Card.Body>
        </Card>
    );
};
