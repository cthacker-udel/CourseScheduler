type CourseTime = "N/A" | [start: string, end: string, isAm: boolean];

type CourseLocation = [hall: string, room: string];

/**
 * Course type, only contains the name, and title, the credits, and pre-reqs will be handled by the loading of the json
 */
export type Course = {
    /**
     * Name of course, ex: ACCT in ACCT200
     */
    name: string;
    /**
     * Number of course, ex: 200 in ACCT200444
     */
    number: string;
    /**
     * The description of the course
     */
    description?: string;
    /**
     * Section of course, ex: 444 in ACCT200444
     */
    section: string;
    /**
     * Title of course, example: The Accounting Experience for ACCT201
     */
    title: string;
    /**
     * The campus the course is located on
     */
    campus: string;
    /**
     * The total # of seats available for the course
     */
    total_seats: string;
    /**
     * The # of credits the course is
     */
    credits: string;
    /**
     * The days of the week the course takes
     */
    day: string[];
    /**
     * The start and end of the course time, and whether or not the time is am or pm
     */
    course_time: CourseTime;
    /**
     * The location of the course with the hall, and the room # as well
     */
    location: CourseLocation;
    /**
     * The teacher teaching the course
     */
    teacher: string;
    /**
     * The pre-requisites of the course
     */
    prereqs: string[];
    /**
     * The co-requisites of the course
     */
    coreqs: string[];
    /**
     * The breadth requirements for the course
     */
    breadth: { [key: string]: string[] };
    /**
     * The education objectives for the course
     */
    education_objectives: string[];
    /**
     * The id of the course
     */
    id: string;
    /**
     * The user the course belongs to (if any)
     */
    username?: string;
};
