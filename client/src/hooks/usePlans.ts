/* eslint-disable @typescript-eslint/indent -- prettier / eslint conflict */
import React from "react";
import type { Plan, ServerSidePlan } from "src/@types";
import { PlansApi } from "src/api/client-side/PlansApi";
import { decryptLoginInformation } from "src/config/encryption/decryptLoginInformation";
import { SESSION_TOKEN_KEY } from "src/config/encryption/keys";

type usePlansReturn = {
    getAllPlans: () => Promise<ServerSidePlan[] | undefined>;
};

/**
 * Custom hook for utilizing all operations when it comes to plans
 */
export const usePlans = (): usePlansReturn => {
    const [data, setData] = React.useState<Plan | Plan[]>();

    const getAllPlans = React.useCallback(async (): Promise<
        ServerSidePlan[] | undefined
    > => {
        const loginInformation = localStorage.getItem(SESSION_TOKEN_KEY);
        if (loginInformation) {
            const decryptedLoginInformation =
                decryptLoginInformation(loginInformation);
            if (decryptedLoginInformation) {
                const result = await PlansApi.getAllPlansWithUsername(
                    decryptedLoginInformation.username,
                );
                if (result) {
                    // Comment
                }
                return result;
            }
            return undefined;
        }
        return undefined;
    }, []);

    return { getAllPlans };
};
