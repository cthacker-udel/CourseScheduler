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
     * Logger instance
     */
    protected static logger: Logger;

    /**
     *
     * @param enabledLocal Whether to enable local configuration or not
     */
    public constructor(enabledLocal = true) {
        ClientSideApi.logger = new Logger();
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
            }).then(async (res) => {
                try {
                    return await res.json();
                } catch (error: unknown) {
                    ClientSideApi.logger.log(
                        "error",
                        `Failed converting get response from ${url} to json`,
                        error,
                    );
                    throw error;
                }
            });
        } catch (error: unknown) {
            ClientSideApi.logger.log(
                "error",
                `Get request with url ${url} failed`,
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
            ClientSideApi.logger.log(
                "info",
                `Post request with url ${url} successful`,
            );
            return await response.json();
        } catch (error: unknown) {
            ClientSideApi.logger.log(
                "error",
                `Post request with url ${url} failed`,
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
            ClientSideApi.logger.log(
                "info",
                `Delete request with url ${url} successful`,
            );
            return await response.json();
        } catch (error: unknown) {
            ClientSideApi.logger.log(
                "error",
                `Delete request with url ${url} failed`,
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
            ClientSideApi.logger.log(
                "info",
                `Put request with url ${url} successful`,
            );
            return await response.json();
        } catch (error: unknown) {
            ClientSideApi.logger.log(
                "error",
                `Put request with url ${url} failed`,
                error,
            );
            throw error;
        }
    };
}
