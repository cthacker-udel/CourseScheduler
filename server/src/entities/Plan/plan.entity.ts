import { Column, Entity, ObjectIdColumn } from "typeorm";

/**
 * Plan Entity
 */
@Entity({ name: "plan" })
export class Plan {
    @ObjectIdColumn()
    /**
     * Id of the plan
     */
    id: number;

    @Column()
    /**
     * Title of the plan
     */
    name: string;

    @Column()
    /**
     * Ids of the semesters under this plan
     */
    semesters: string[];
}
