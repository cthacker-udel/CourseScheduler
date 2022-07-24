export const TEMP_SECRETS = {
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
