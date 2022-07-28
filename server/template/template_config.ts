/**
 * Place in server/config/config.ts file
 *
 * Folder should look like: config(folder) --> [ config.ts, index.ts ]
 */

export const SECRETS = {
    SECRET: "Random secret",
    MONGO_CONNECT_STRING: "random-connect-string",
};

export const configurations = {
    mongo_typeorm: {
        type: "mongodb",
        database: "random database",
        synchronize: true,
        logging: ["query", "error"],
        entities: [],
        username: "random-username",
        password: "random-password",
        url: "random-connect-url",
    },
};
