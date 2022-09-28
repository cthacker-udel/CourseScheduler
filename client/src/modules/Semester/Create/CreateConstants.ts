const TEXT = {
    BUTTON_TEXT: "Create",
    CARD_TITLE: "Create Semester",
    FORM1_LABEL: "Name",
    FORM2_LABEL: "Year",
    FORM3_LABEL: "Season",
};

const VALIDATION_TEXT = {
    name: {
        invalid: {
            length: "Name cannot exceed 75 characters",
            regex: "Name cannot have spaces in it",
            required: "Name is required",
        },
        valid: "Valid name",
    },
    year: {
        invalid: {
            isNaN: "Year must be a value",
            maximum: "Year cannot exceed maximum value",
            negative: "Year cannot be negative",
        },
        valid: "Year is valid",
    },
};

const VALIDATION_VALUES = {
    name: {
        length: 75,
        regex: /^[^ ]+$/gu,
        required: true,
    },
    year: {
        maximum: 10_000,
    },
};

export { TEXT, VALIDATION_TEXT, VALIDATION_VALUES };
