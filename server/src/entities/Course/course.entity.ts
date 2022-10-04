import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity({ name: "courses" })
export class Course {
    /**
     * The identifying id of this course
     */
    @ObjectIdColumn()
    id: number;

    /**
     * The class section, like ACCT100[classSection]
     */
    @Column()
    classSection: string;

    /**
     * The # of credits the course fulfills
     */
    @Column()
    credits: number;

    /**
     * The description of the class
     */
    @Column()
    description: string;

    /**
     * The ids of the labs, stored in the lab collection
     */
    @Column()
    labIds: string[];

    /**
     * The name of the course
     */
    @Column()
    name: string;

    /**
     * The section of the course ACCT[section]010 for example
     */
    @Column()
    section: string;

    /**
     * The ids of the semester this course belongs to
     */
    @Column()
    semesterIds?: string[];

    /**
     * The username of the user this course belongs to
     */
    @Column()
    username: string;
}
