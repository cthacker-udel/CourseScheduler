const TEXT = {
    CARD_TITLE: "Create a Course",
    FORM1_LABEL: "Course Name",
    FORM2_LABEL: "Course Description",
    FORM3_LABEL: "Credits",
    FORM4_LABEL: "Section",
    FORM5_LABEL: "Class Section",
    FORM6_LABEL: "Is Lab",
    FORM7_LABEL: "Lab Sections",
    FORM8_LABEL: "Course Pre-Requisites",
};

const VALIDATION_VALUES = {
    classSection: {
        maxLength: 3,
        pattern: /^\d+$/giu,
        required: true,
    },
    credits: {
        max: 4,
        min: 1,
        required: true,
    },
    description: {
        maxLength: 300,
        required: true,
    },
    name: {
        maxLength: 75,
        required: true,
    },
    section: {
        maxLength: 3,
        pattern: /^\d+$/giu,
        required: true,
    },
};

const VALIDATION_TEXT = {
    classSection: {
        alreadyExists: "Lab Section already exists",
        maxLength: "Class section cannot be more then (3) characters",
        pattern: "Class section must be numerical",
        required: "Class section is required",
        valid: "Class section is valid",
    },
    credits: {
        max: "Class must be at most 4 credits",
        min: "Class must be at least 1 credit",
        required: "Class is required to have credits",
        valid: "Credits is valid",
    },
    description: {
        maxLength: "Description cannot be more then 75 characters",
        required: "Description is required",
        valid: "Description is valid",
    },
    name: {
        maxLength: "Name cannot be more then 75 characters",
        required: "Name is required",
        valid: "Name is valid",
    },
    section: {
        maxLength: "Section cannot be more then (3) characters",
        pattern: "Section must be numerical",
        required: "Class section is required",
        valid: "Class section is valid",
    },
};

export { TEXT, VALIDATION_TEXT, VALIDATION_VALUES };
