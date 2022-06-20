import winston from "winston";

type LoggingType = "debug" | "error" | "http" | "info" | "silly" | "verbose" | "warn";

/**
 * Logger class implementing the winston library
 */
export class Logger {
    protected logger: winston.Logger;

    /**
     * No-Argument constructor, creates a winston logger with default parameters (for now)
     */
    public constructor(inProduction = false) {
        this.logger = winston.createLogger({
            defaultMeta: { service: "logging-service" },
            format: winston.format.json(),
            level: "info",
            transports: [
                new winston.transports.File({
                    filename: "erorr.log",
                    level: "error",
                }),
                new winston.transports.File({ filename: "combined.log" }),
            ],
        });
        if (!inProduction) {
            this.logger.add(new winston.transports.Console({
                format: winston.format.simple(),
            }));
        }
    }

    /**
     * This function acts as a logging utility, allowing the user to specify the level, message, and the content of the log
     * @param level The level of logging
     * @param message The header message for the log
     * @param content The content of the log
     */
    public log = (level: LoggingType, message: string, content?: unknown): void => {
        this.logger.log({
            content,
            level,
            message,
        });
    };

}
