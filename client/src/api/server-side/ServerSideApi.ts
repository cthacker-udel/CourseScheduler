import { configuration } from "src/configuration";
import { localConfiguration } from "src/configuration.local";

/**
 * This is a Server-Side API wrapper class
 */
export class ServerSideApi {
    protected BASE_URL: string;

    /**
     *
     * @param enabledLocal Whether to enable local configuration or not
     */
    public constructor(enabledLocal = true) {
        this.BASE_URL = enabledLocal
            ? localConfiguration.SERVER_BASE_URL
            : configuration.SERVER_BASE_URL;
    }

    // eslint-disable-next-line @typescript-eslint/promise-function-async -- not needed
    public get = <T>(url: string): Promise<T> =>
        // eslint-disable-next-line @typescript-eslint/promise-function-async -- not needed
        fetch(`${this.BASE_URL}${url}`).then((res) => res.json());
}
