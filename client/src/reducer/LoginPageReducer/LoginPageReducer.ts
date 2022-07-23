import type { LoginPageReducerAction, LoginPageState } from "src/@types";

/**
 *
 * @param state The current state of the application
 * @param action The action the user is taking, along with any updates to state they want to make
 * @returns The updated state
 */
export const LoginPageReducer = (
    state: LoginPageState,
    action: LoginPageReducerAction,
): LoginPageState => {
    switch (action.type) {
        case "setLoginOverlay": {
            return {
                ...state,
                showLoginOverlay: action.payload.showLoginOverlay,
            };
        }
        case "setPasswordOverlay": {
            return {
                ...state,
                showPasswordOverlay: action.payload.showPasswordOverlay,
            };
        }
        case "setSignUpOverlay": {
            return {
                ...state,
                showSignUpOverlay: action.payload.showSignUpOverlay,
            };
        }
        case "setShowPassword": {
            return {
                ...state,
                showPassword: !state.showPassword,
            };
        }
        default: {
            return { ...state };
        }
    }
};
