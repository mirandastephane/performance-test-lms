import { getEndpoint, validateResponse, endpoints } from '../utils/endpoints.js';
import { check } from 'k6';

export const options = {
    vus: 100, // high number of users
    duration: '1m', // test duration
};

export default function () {
    const responseCourses = getEndpoint(endpoints.courses);
    check(responseCourses, { 'status is 200': (r) => r.status === 200 });
    validateResponse(responseCourses);

    const responseLearnpaths = getEndpoint(endpoints.learnPaths);
    check(responseLearnpaths, { 'status is 200': (r) => r.status === 200 });
    validateResponse(responseLearnpaths);

    const responseMenuCourses = getEndpoint(endpoints.menuCourses);
    check(responseMenuCourses, { 'status is 200': (r) => r.status === 200 });
    validateResponse(responseMenuCourses);

    const responseEnrollments = getEndpoint(endpoints.enrollments);
    check(responseEnrollments, { 'status is 200': (r) => r.status === 200 });
    validateResponse(responseEnrollments);
}
