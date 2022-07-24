import type { LoginPageReducerActionType } from "./LoginPageReducerActionType";
import type { LoginPageState } from "./LoginPageState";

/**
 * Action that will be utilized in the reducer
 */
export type LoginPageReducerAction = {
    type: LoginPageReducerActionType;
    payload: LoginPageState;
};
