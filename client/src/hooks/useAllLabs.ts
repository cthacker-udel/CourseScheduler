import React from "react";
import type { Lab } from "src/@types";
import { LabsApi } from "src/api/client-side/LabsApi";
import { Logger } from "src/log/Logger";

type useAllLabsReturn = {
    labs: Lab[];
};

/**
 * Utility hook for fetching all labs from the collection
 *
 * @param courseId - The courseId to filter the lab results by
 */
export const useAllLabs = (courseId?: string): useAllLabsReturn => {
    const [labs, setLabs] = React.useState<Lab[]>([]);

    React.useEffect(() => {
        LabsApi.getAllLabs(courseId)
            .then((allLabs): void => {
                setLabs(allLabs);
            })
            .catch((error: unknown) => {
                Logger.log("error", (error as Error).message);
            });
    }, [courseId]);

    return { labs };
};
