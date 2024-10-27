import { getEndpoint, endpoints } from '../utils/endpoints.js';
import { check } from 'k6';

export const options = {
    vus: 10, // number of users
    duration: '10s', // test duration
};

// Response validation function
function checkResponse(response, endpointName) {
    // Checking both status and response time requirements
    const isStatus200 = check(response, {
        'status is 200': (r) => r.status === 200,
        'response time is <= 300ms': (r) => r.timings.duration <= 300,
    });

    // Log error if status is not 200
    if (response.status !== 200) {
        console.error(`Error on endpoint ${endpointName}: received status ${response.status}`);
    }

    // Log warning if response time exceeds 300 ms
    if (response.timings.duration > 300) {
        console.warn(`Warning: Response time for endpoint ${endpointName} exceeded 300ms - Actual time: ${response.timings.duration}ms`);
    }
}

// Main execution of the test

export default function () {
     // Testing endpoints in the 'menu' group
     const responseLearningPathBreakdown = getEndpoint(endpoints.menu.learningPathBreakdown, 12345);
     checkResponse(responseLearningPathBreakdown, 'menu.learningPathBreakdown');

     const responseCourseBreakdown = getEndpoint(endpoints.menu.courseBreakdown, 67890);
     checkResponse(responseCourseBreakdown, 'menu.courseBreakdown');

     const responseItems = getEndpoint(endpoints.menu.items);
     checkResponse(responseItems, 'menu.items');

     const responseCourses = getEndpoint(endpoints.menu.courses);
     checkResponse(responseCourses, 'menu.courses');

    const responseKnowledgeCheck = getEndpoint(endpoints.menu.knowledgeCheck, 27252965);
    checkResponse(responseKnowledgeCheck, 'knowledgeCheck');

     // Testing endpoints in the 'quizes' group
     const responseQuizQuestions = getEndpoint(endpoints.quizes.questions, 98765);
     checkResponse(responseQuizQuestions, 'quizes.questions');

     const responseQuiz = getEndpoint(endpoints.quizes.quiz, 98765);
     checkResponse(responseQuiz, 'quizes.quiz');

     const responseQuizResult = getEndpoint(endpoints.quizes.result, 98765);
     checkResponse(responseQuizResult, 'quizes.result');

     // Testing endpoints in the 'progress' group
     const responseProgress = getEndpoint(endpoints.progress.base);
     checkResponse(responseProgress, 'progress.base');

     const responseProgressByScope = getEndpoint(endpoints.progress.byScope, 54321);
     checkResponse(responseProgressByScope, 'progress.byScope');

     // Testing endpoints in the 'user' group
     const responseUserEnrollments = getEndpoint(endpoints.user.enrollments);
     checkResponse(responseUserEnrollments, 'user.enrollments');

     const responseUserBadges = getEndpoint(endpoints.user.badges);
     checkResponse(responseUserBadges, 'user.badges');

     const responseEnrollmentByAsset = getEndpoint(endpoints.user.enrollmentByAsset, 12345);
     checkResponse(responseEnrollmentByAsset, 'user.enrollmentByAsset');

     const responseEnrollment = getEndpoint(endpoints.user.enrollment, 67890);
     checkResponse(responseEnrollment, 'user.enrollment');
}
