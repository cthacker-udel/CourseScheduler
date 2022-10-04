import React from "react";
import type { Semester } from "src/@types";
import { SemestersApi } from "src/api/client-side/SemestersApi";
import { getLoggedInUser } from "src/helpers";
import { Logger } from "src/log/Logger";

type useAllSemestersReturn = {
    semesters: Semester[];
};

/**
 * Custom hook for fetching all semesters with the current logged in user's username
 */
export const useAllSemesters = (): useAllSemestersReturn => {
    const [semesters, setSemesters] = React.useState<Semester[]>([]);
    React.useEffect(() => {
        console.log(window);
        const { username } = getLoggedInUser();
        SemestersApi.getAllSemesters(username)
            .then((fetchedSemesters: Semester[]) => {
                setSemesters(fetchedSemesters);
            })
            .catch((error: unknown) => {
                Logger.log("error", (error as Error).message);
            });
    }, []);

    return {
        semesters,
    };
};
