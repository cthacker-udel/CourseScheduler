import { configuration } from "src/configuration";
import { localConfiguration } from "src/configuration.local";

import { Logger } from "../Logger";

/**
 * This is a Server-Side API wrapper class
 */
export class ServerSideApi {

    /**
     * Base url for requests
     */
    protected BASE_URL: string;

    /**
     * Logger instance
     */
    protected logger: Logger;

    /**
     *
     * @param enabledLocal Whether to enable local configuration or not
     */
    public constructor(enabledLocal = true) {
        this.logger = new Logger();
        this.BASE_URL = enabledLocal
            ? localConfiguration.SERVER_BASE_URL
            : configuration.SERVER_BASE_URL;
    }

    /**
     * This function serves as a get request helper method for server-side requests
     * @param url The url the user is fetching from
     * @returns The promise of the type of the response
     */
    public get = async <T>(url: string, headers?: { [key: string]: string }): Promise<T> => {
        try {
            return await fetch(`${this.BASE_URL}${url}`, { headers: headers ?? {} }).then(async (res) => {
                try {
                    return await res.json();
                } catch (error: unknown) {
                    this.logger.log("error", `Failed converting get response from ${url} to json`, error);
                    throw error;
                }
            });
        } catch (error: unknown) {
            this.logger.log("error", `Get request with url ${url} failed`, error);
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
    public post = async <T>(
        url: string,
        body?: { [key: string]: unknown },
        headers?: { [key: string]: string },
    ): Promise<T> => {
        try {
            const response: Response = await fetch(`${this.BASE_URL}${url}`, {
                body: JSON.stringify(body ?? {}),
                cache: "no-cache",
                headers: headers ?? {},
                method: "POST",
                mode: "no-cors",
            });
            this.logger.log("info", `Post request with url ${url} successful`);
            return await response.json();
        } catch (error: unknown) {
            this.logger.log("error", `Post request with url ${url} failed`, error);
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
    public delete = async <T>(
        url: string,
        body?: { [key: string]: unknown },
        headers?: { [key: string]: string },
    ): Promise<T> => {
        try {
            const response: Response = await fetch(`${this.BASE_URL}${url}`, {
                body: JSON.stringify(body ?? {}),
                cache: "no-cache",
                headers: headers ?? {},
                method: "DELETE",
                mode: "no-cors",
            });
            this.logger.log("info", `Delete request with url ${url} successful`);
            return await response.json();
        } catch (error: unknown) {
            this.logger.log("error", `Delete request with url ${url} failed`, error);
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
    public put = async <T>(
        url: string,
        body?: { [key: string]: unknown },
        headers?: { [key: string]: string },
    ): Promise<T> => {
        try {
            const response: Response = await fetch(`${this.BASE_URL}${url}`, {
                body: JSON.stringify(body ?? {}),
                cache: "no-cache",
                headers: headers ?? {},
                method: "PUT",
                mode: "no-cors",
            });
            this.logger.log("info", `Put request with url ${url} successful`);
            return await response.json();
        } catch (error: unknown) {
            this.logger.log("error", `Put request with url ${url} failed`, error);
            throw error;
        }
    };
}
