/* eslint-disable @typescript-eslint/no-extraneous-class -- keep class this way */
/* eslint-disable no-console -- disabled for logger */
type LoggingType =
    | "debug"
    | "error"
    | "http"
    | "info"
    | "silly"
    | "verbose"
    | "warn";

/**
 * Logger class implementing the winston library
 */
export class Logger {
    /**
     * This function acts as a logging utility, allowing the user to specify the level, message, and the content of the log
     * @param level The level of logging
     * @param message The header message for the log
     * @param content The content of the log
     */
    public static log = (
        level: LoggingType,
        message: string,
        fileName?: string,
        lineNumber?: number,
        content?: unknown,
    ): void => {
        console.log({
            content,
            fileName,
            level,
            lineNumber,
            message,
        });
    };
}
