export const CREATE_VALIDATION = {
    NAME: {
        MESSAGES: {
            invalid: {
                maxLength: "Name must be at-most 50 characters.",
                minLength: "Name must be at-least 1 character.",
                pattern: "Name cannot contain spaces",
            },
            valid: "Name is valid.",
        },
        VALUES: {
            maxLength: 50,
            minLength: 1,
        },
    },
};
