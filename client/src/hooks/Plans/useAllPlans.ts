/* eslint-disable no-magic-numbers -- not needed */
import React from "react";
import type { ServerSidePlan, SessionToken } from "src/@types";
import { PlansApi } from "src/api/client-side/PlansApi";
import { decryptLoginInformation } from "src/config/encryption/decryptLoginInformation";
import { SESSION_TOKEN_KEY } from "src/config/encryption/keys";
import { Logger } from "src/log/Logger";

type useAllPlansReturn = {
    plans: ServerSidePlan[] | undefined;
};

/**
 * Hook for fetching all plans under a user
 */
export const useAllPlans = (): useAllPlansReturn => {
    const [plans, setPlans] = React.useState<ServerSidePlan[] | undefined>([]);
    React.useEffect(() => {
        const loginSessionInfo = localStorage.getItem(SESSION_TOKEN_KEY);
        if (loginSessionInfo) {
            const convertedSessionInfo = JSON.parse(
                loginSessionInfo,
            ) as SessionToken;
            const decryptedLoginSessionInfo = decryptLoginInformation(
                convertedSessionInfo.session,
            );
            if (decryptedLoginSessionInfo) {
                PlansApi.getAllPlansWithUsername(
                    decryptedLoginSessionInfo.username,
                )
                    .then((fetchedPlans: ServerSidePlan[] | undefined) => {
                        setPlans(fetchedPlans);
                    })
                    .catch((error: unknown) => {
                        Logger.log(
                            "error",
                            `Failed to fetch all plans ${
                                (error as Error).stack
                            }`,
                            "useAllPlans.ts",
                            20,
                        );
                    });
            }
        }
    }, []);

    return { plans };
};
