import type MockCourse from "src/common/types/MockCourse";
import courses from "src/data/catalog.json";

/**
 * Takes no arguments, returns mock course data from the data directory
 * @returns {MockCourse[]} The mock course data
 */
export const useMockData = (): MockCourse[] => courses as MockCourse[];
