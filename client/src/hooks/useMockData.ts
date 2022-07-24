import type { MockCourse } from "src/@types";
import courses from "src/data/catalog.json";

/**
 * Takes no arguments, returns mock course data from the data directory
 * @returns {MockCourse[]} The mock course data
 */
export const useMockData = (): MockCourse[] => courses as MockCourse[];
