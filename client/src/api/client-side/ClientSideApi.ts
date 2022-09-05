/* eslint-disable no-magic-numbers -- disabled to avoid errors when logging with the line #*/
/* eslint-disable @typescript-eslint/no-extraneous-class -- will fix later */
import { configuration, localConfiguration } from "src/config";
import { Logger } from "src/log/Logger";

/**
 * Client side api, makes requests to the pages to then call the server side api
 */
export class ClientSideApi {
    /**
     * Base url for requests
     */
    protected static BASE_URL = "http://localhost:3000/api";

    /**
     *
     * @param enabledLocal Whether to enable local configuration or not
     */
    public constructor(enabledLocal = true) {
        ClientSideApi.BASE_URL = enabledLocal
            ? localConfiguration.SERVER_BASE_URL
            : configuration.SERVER_BASE_URL;
    }

    /**
     * This function serves as a get request helper method for client-side reqeusts
     *
     * @param url
     * @param headers
     */
    public static get = async <T>(
        url: string,
        headers?: { [key: string]: string },
    ): Promise<T> => {
        try {
            return await fetch(`${ClientSideApi.BASE_URL}${url}`, {
                headers: headers ?? {},
            }).then(async (response) => {
                try {
                    return await response.json();
                } catch (error: unknown) {
                    Logger.log(
                        "error",
                        `Failed converting get response from ${url} to json`,
                        "ClientSideApi",
                        41,
                        error,
                    );
                    throw error;
                }
            });
        } catch (error: unknown) {
            Logger.log(
                "error",
                `Get request with url ${url} failed`,
                "ClientSideApi",
                53,
                error,
            );
            throw error;
        }
    };

    /**
     * This function serves as a post request helper method for client-side requests
     * @param url The url the user is fetching from
     * @param body The body of the post request
     * @param headers The headers of the post request
     * @returns The response of the post request
     */
    public static post = async <T>(
        url: string,
        body?: { [key: string]: unknown },
        headers?: { [key: string]: string },
    ): Promise<T> => {
        try {
            const response: Response = await fetch(
                `${ClientSideApi.BASE_URL}${url}`,
                {
                    body: JSON.stringify(body ?? {}),
                    cache: "no-cache",
                    headers: headers ?? {},
                    method: "POST",
                    mode: "no-cors",
                },
            );
            return await response.json();
        } catch (error: unknown) {
            Logger.log(
                "error",
                `Post request with url ${url} failed`,
                "ClientSideApi",
                95,
                error,
            );
            throw error;
        }
    };

    /**
     * This function serves as a delete request helper method for client-side requests
     * @param url The url of the delete request
     * @param body The body of the delete request
     * @param headers The headers of the delete request
     * @returns The response from the delete request
     */
    public static delete = async <T>(
        url: string,
        body?: { [key: string]: unknown },
        headers?: { [key: string]: string },
    ): Promise<T> => {
        try {
            const response: Response = await fetch(
                `${ClientSideApi.BASE_URL}${url}`,
                {
                    body: JSON.stringify(body ?? {}),
                    cache: "no-cache",
                    headers: headers ?? {},
                    method: "DELETE",
                    mode: "no-cors",
                },
            );
            return await response.json();
        } catch (error: unknown) {
            Logger.log(
                "error",
                `Delete request with url ${url} failed`,
                "ClientSideApi",
                137,
                error,
            );
            throw error;
        }
    };

    /**
     * This function serves as a put request helper method for client-side requests
     * @param url The url of the put request
     * @param body The body of the put request
     * @param headers The headers of the put request
     * @returns The response from the put request
     */
    public static put = async <T>(
        url: string,
        body?: { [key: string]: unknown },
        headers?: { [key: string]: string },
    ): Promise<T> => {
        try {
            const response: Response = await fetch(
                `${ClientSideApi.BASE_URL}${url}`,
                {
                    body: JSON.stringify(body ?? {}),
                    cache: "no-cache",
                    headers: headers ?? {},
                    method: "PUT",
                    mode: "no-cors",
                },
            );
            return await response.json();
        } catch (error: unknown) {
            Logger.log(
                "error",
                `Put request with url ${url} failed`,
                "ClientSideApi",
                179,
                error,
            );
            throw error;
        }
    };
}
