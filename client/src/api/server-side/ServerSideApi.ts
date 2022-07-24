/* eslint-disable no-magic-numbers -- disabled to avoid errors when logging the line number */
/* eslint-disable @typescript-eslint/no-extraneous-class -- will fix later */
import { configuration } from "src/config/configuration";
import { localConfiguration } from "src/config/configuration.local";
import { Logger } from "src/log/Logger";

/**
 * This is a Server-Side API wrapper class
 */
export class ServerSideApi {
    /**
     * Base url for requests
     */
    protected static BASE_URL = "http://localhost:3001";

    /**
     *
     * @param enabledLocal Whether to enable local configuration or not
     */
    public constructor(enabledLocal = true) {
        ServerSideApi.BASE_URL = enabledLocal
            ? localConfiguration.SERVER_BASE_URL
            : configuration.SERVER_BASE_URL;
    }

    /**
     * This function serves as a get request helper method for server-side requests
     * @param url The url the user is fetching from
     * @returns The promise of the type of the response
     */
    public static get = async <T>(
        url: string,
        headers?: { [key: string]: string },
    ): Promise<T> => {
        try {
            return await fetch(`${ServerSideApi.BASE_URL}${url}`, {
                headers: headers ?? {},
            }).then(async (res) => {
                try {
                    return await res.json();
                } catch (error: unknown) {
                    Logger.log(
                        "error",
                        `Failed converting get response from ${url} to json`,
                        "ServerSideApi",
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
                "ServerSideApi",
                53,
                error,
            );
            throw error;
        }
    };

    /**
     * This function serves as a post request helper method for server-side requests
     * @param url The url the user is fetching from
     * @param body The body of the post request
     * @param headers The headers of the post request
     * @returns The response of the post request
     */
    public static post = async <T>(
        url: string,
        body?: { [key: string]: unknown },
        headers: { [key: string]: string } = {
            "Content-type": "application/json; charset=UTF-8",
        },
    ): Promise<T> => {
        try {
            const response: Response = await fetch(
                `${ServerSideApi.BASE_URL}${url}`,
                {
                    body: JSON.stringify(body ?? {}),
                    headers: headers ?? {},
                    method: "POST",
                },
            );
            return await response.json();
        } catch (error: unknown) {
            Logger.log(
                "error",
                `Post request with url ${url} failed`,
                "ServerSideApi",
                95,
                error,
            );
            throw error;
        }
    };

    /**
     * This function serves as a delete request helper method for server-side requests
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
                `${ServerSideApi.BASE_URL}${url}`,
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
                "ServerSideApi",
                137,
                error,
            );
            throw error;
        }
    };

    /**
     * This function serves as a put request helper method for server-side requests
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
                `${ServerSideApi.BASE_URL}${url}`,
                {
                    body: JSON.stringify(body ?? {}),
                    cache: "no-cache",
                    headers: headers ?? {},
                    method: "PUT",
                    mode: "no-cors",
                },
            );
            Logger.log(
                "info",
                `Put request with url ${url} successful`,
                "ServerSideApi",
                171,
            );
            return await response.json();
        } catch (error: unknown) {
            Logger.log(
                "error",
                `Put request with url ${url} failed`,
                "ServerSideApi",
                179,
                error,
            );
            throw error;
        }
    };
}
