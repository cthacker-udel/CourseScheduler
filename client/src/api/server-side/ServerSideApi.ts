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


    public get = async <T, E>(url: string): Promise<T | E> => {
        try {
            return await fetch(`${this.BASE_URL}${url}`).then((res) => res.json());
        } catch (error: E) {
            
        }
    
    }
}
