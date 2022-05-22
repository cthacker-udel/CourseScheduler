/**
 * Course type, only contains the name, and title, the credits, and pre-reqs will be handled by the loading of the json
 */
interface Course {
    name: string;
    title?: string;
}

export default Course;
