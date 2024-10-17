import { getEndpoint, validateResponse, endpoints } from '../utils/endpoints.js';
import { check } from 'k6';


export const options = {
    vus: 10, // number of virtual users
    duration: '5s', // test duration
};

export default function () {
    // Testing the /courses endpoint
    const responseCourses = getEndpoint(endpoints.courses);
    check(responseCourses, { 'status is 200': (r) => r.status === 200 });
    validateResponse(responseCourses);

    // Testing the /learnpaths endpoint
    const responseLearnpaths = getEndpoint(endpoints.learnPaths);
    check(responseLearnpaths, { 'status is 200': (r) => r.status === 200 });
    validateResponse(responseLearnpaths);

    // Testing the /courses endpoint
    const responseMenuCourses = getEndpoint(endpoints.menuCourses);
    check(responseMenuCourses, { 'status is 200': (r) => r.status === 200 });
    validateResponse(responseMenuCourses);

    // Testing the /enrollments endpoint
    const responseEnrollments = getEndpoint(endpoints.enrollments);
    check(responseEnrollments, { 'status is 200': (r) => r.status === 200 });
    validateResponse(responseEnrollments);
}
