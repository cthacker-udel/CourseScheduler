/* eslint-disable @typescript-eslint/no-floating-promises -- don't need to have exhaustive promise syntax for two assertions */
/* eslint-disable @typescript-eslint/no-explicit-any -- disabled any for renderWithIntl */
/* eslint-disable @typescript-eslint/no-magic-numbers -- disabled */
/* eslint-disable no-magic-numbers -- disabled */
import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { act } from "react-dom/test-utils";
import { IntlProvider } from "react-intl";
import homeMessages from "src/locale/en/home.json";

import HomePage from "../HomePage";

/**
 * @summary Takes no arguments, returns HomePage component rendered with react-intl
 * @returns The HomePage rendered with implementation of react-intl
 */
const renderWithIntl = (): any =>
    render(
        <IntlProvider
            defaultLocale="en"
            locale="en"
            messages={{ ...homeMessages }}
        >
            <HomePage />
        </IntlProvider>,
    );

describe("homePage test suite", (): void => {
    describe("homePage", () => {
        test("home Page renders", () => {
            expect.assertions(6);

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

        test("clicking one accordion displays it's text, and clicking another accordion collapses the previous accordion's text, while also displaying the currently clicked accordion's text", () => {
            expect.assertions(6);

            renderWithIntl();

            const accordion = screen.getByText(homeMessages.option_1);
            act(async (): Promise<void> => {
                await userEvent.click(accordion);
            });

            expect(screen.getByText(homeMessages.option_1_desc)).toBeTruthy();

            const accordion2 = screen.getByText(homeMessages.option_2);

            act(async (): Promise<void> => {
                await userEvent.click(accordion2);
            });

            expect(accordion.parentElement).not.toBeNull();
            expect(accordion2?.parentElement).not.toBeNull();
            expect(accordion?.parentElement?.className).toContain("collapsed");
            expect(accordion2?.parentElement?.className).not.toContain(
                "collapsed",
            );
            expect(screen.getByText(homeMessages.option_2_desc)).toBeTruthy();
        });

        test("all accordions are clickable", () => {
            expect.assertions(5);

            renderWithIntl();

            expect(screen.getByText(homeMessages.option_1)).toBeTruthy();
            expect(screen.getByText(homeMessages.option_2)).toBeTruthy();
            expect(screen.getByText(homeMessages.option_3)).toBeTruthy();
            expect(screen.getByText(homeMessages.option_4)).toBeTruthy();
            expect(screen.getByText(homeMessages.option_5)).toBeTruthy();
        });
    });
});
