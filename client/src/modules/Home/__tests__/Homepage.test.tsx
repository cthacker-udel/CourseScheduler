import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import React from "react";
import { act } from "react-dom/test-utils";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../HomePage";
import homeMessages from "../../../locale/en/home.json";

const renderWithIntl = () =>
    render(
        <IntlProvider
            defaultLocale="en"
            locale="en"
            messages={{ ...homeMessages }}
        >
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        </IntlProvider>,
    );

describe("HomePage test suite", () => {
    describe("HomePage", () => {
        test("Home Page renders", () => {
            renderWithIntl();

            expect(screen.getByText(homeMessages.card_title)).toBeTruthy();
            expect(
                screen.getAllByText(homeMessages.option_1).length,
            ).toBeGreaterThan(0);
            expect(
                screen.getAllByText(homeMessages.option_2).length,
            ).toBeGreaterThan(0);
            expect(
                screen.getAllByText(homeMessages.option_3).length,
            ).toBeGreaterThan(0);
            expect(
                screen.getAllByText(homeMessages.option_4).length,
            ).toBeGreaterThan(0);
            expect(
                screen.getAllByText(homeMessages.option_5).length,
            ).toBeGreaterThan(0);
        });

        test("Clicking one accordion displays it's text, and clicking another accordion collapses the previous accordion's text, while also displaying the currently clicked accordion's text", () => {
            renderWithIntl();

            const accordion = screen.getByText(homeMessages.option_1);
            act(() => {
                userEvent.click(accordion);
            });

            expect(screen.getByText(homeMessages.option_1_desc)).toBeTruthy();

            const accordion2 = screen.getByText(homeMessages.option_2);

            act(() => {
                userEvent.click(accordion2);
            });

            expect(accordion.parentElement).not.toBeNull();
            expect(accordion2.parentElement).not.toBeNull();
            expect(accordion?.parentElement.className).toContain("collapsed");
            expect(accordion2.parentElement.className).not.toContain(
                "collapsed",
            );
            expect(screen.getByText(homeMessages.option_2_desc)).toBeTruthy();
        });

        test("All accordions are clickable", () => {
            renderWithIntl();

            expect(screen.getByText(homeMessages.option_1)).toBeTruthy();
            expect(screen.getByText(homeMessages.option_2)).toBeTruthy();
            expect(screen.getByText(homeMessages.option_3)).toBeTruthy();
            expect(screen.getByText(homeMessages.option_4)).toBeTruthy();
            expect(screen.getByText(homeMessages.option_5)).toBeTruthy();
        });
    });
});
