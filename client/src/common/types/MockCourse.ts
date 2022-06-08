/**
 * Course type, only contains the name, and title, the credits, and pre-reqs will be handled by the loading of the json
 */
interface MockCourse {
    name: string;
    id: string;
    description: string;
    credits: string;
    prereqs: string;
    ubreadth: string;
    ebreadth: string;
}

export default MockCourse;
