/**
 * DTO for adding a plan to the schedule
 */
export class CreatePlanDTO {
    /**
     * The name of the plan
     */
    name: string;
    /**
     * The username of the user who is creating the plan
     */
    username: string;
    /**
     * The ids of the semesters going into the plans
     */
    semesters: string[];
}
