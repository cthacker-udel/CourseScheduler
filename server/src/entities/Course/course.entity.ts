import { Column, Entity, ObjectIdColumn } from "typeorm";

type CourseTime = "N/A" | [start: string, end: string, isAm: boolean];

type CourseLocation = [hall: string, room: string];

@Entity({ name: "courses" })
export class Course {
    /**
     * The identifying id of this course
     */
    @ObjectIdColumn()
    courseId: number;

    /**
     * Name of course, ex: ACCT in ACCT200
     */
    @Column()
    name: string;
    /**
     * Number of course, ex: 200 in ACCT200444
     */
    @Column()
    number: string;
    /**
     * The description of the course
     */
    @Column()
    description?: string;
    /**
     * Section of course, ex: 444 in ACCT200444
     */
    @Column()
    section: string;
    /**
     * Title of course, example: The Accounting Experience for ACCT201
     */
    @Column()
    title: string;
    /**
     * The campus the course is located on
     */
    @Column()
    campus: string;
    /**
     * The total # of seats available for the course
     */
    @Column()
    total_seats: string;
    /**
     * The # of credits the course is
     */
    @Column()
    credits: string;
    /**
     * The days of the week the course takes
     */
    @Column()
    day: string[];
    /**
     * The start and end of the course time, and whether or not the time is am or pm
     */
    @Column()
    course_time: CourseTime;
    /**
     * The location of the course with the hall, and the room # as well
     */
    @Column()
    location: CourseLocation;
    /**
     * The teacher teaching the course
     */
    @Column()
    teacher: string;
    /**
     * The pre-requisites of the course
     */
    @Column()
    prereqs: string[];
    /**
     * The co-requisites of the course
     */
    @Column()
    coreqs: string[];
    /**
     * The breadth requirements for the course
     */
    @Column()
    breadth: { [key: string]: string[] };
    /**
     * The education objectives for the course
     */
    @Column()
    education_objectives: string[];
    /**
     * The id of the course
     */
    @Column()
    id: string;
    /**
     * The user the course belongs to (if any)
     */
    @Column()
    username?: string;
}
