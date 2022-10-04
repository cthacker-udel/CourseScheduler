/**
 * Course type, only contains the name, and title, the credits, and pre-reqs will be handled by the loading of the json
 */
export type Course = {
    /**
     * The section of the course, something like CISC 100 for example
     */
    section: string;
    /**
     * The name of the course, contains the ID and the text name of the course.
     */
    name: string;
    /**
     * Format is: "[ClassPrefix] [ID#]" in that exact order, an unique identifier for the class
     */
    classSection: string;
    /**
     * General text description of the class
     */
    description: string;
    /**
     * The # of credits the class takes
     */
    credits: string;
    /**
     * The Pre-Requisites of the course
     */
    preRequisiteIds: string[];
    /**
     * The university of breadth requirements that class fulfills
     */
    breadthRequirements: string;
};
