import { ClientSideApi } from "./ClientSideApi";

/**
 * Client-side SemesterApi, constructs calls to send to the server-side
 */
export class SemesterApi extends ClientSideApi {
    public static BASE_URL = "/semester/";
}
