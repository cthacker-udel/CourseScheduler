/**
 * DTO for adding a plan to the schedule
 */
export class CreatePlanDTO {
    /**
     * The id of the user, which we will use to append the plan to.
     */
    id: string;
    /**
     * The name of the plan
     */
    name: string;
    /**
     * The ids of the semesters going into the plans
     */
    semesters: string[];
}
