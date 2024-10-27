import http from 'k6/http';

export const endpoints = {
    menu: {
        learningPathBreakdown: (courseId) => `/menu/learning-path/${courseId}/breakdown`,
        courseBreakdown: (courseId) => `/menu/course/${courseId}/breakdown`,
        learningPathStepBreakdown: (learningPathStepId) => `/menu/learning-path-step/${learningPathStepId}/breakdown`,
        items: '/menu/items',
        lessonOne: (courseId) => `/menu/lessonOne/${courseId}`,
        courseMenu: (courseId) => `/menu/course-menu/${courseId}`,
        knowledgeCheck: (courseId) => `/menu/${courseId}/quiz/course`,
        assetMenu: (assetId, assetType, navigationMenuType) => `/menu/${assetId}/${assetType}/${navigationMenuType}`,
        courses: '/menu/courses',
        learningPaths: '/menu/learning-paths/'
    },
    quizes: {
        questions: (quizId) => `/quizes/${quizId}/questions`,
        quiz: (quizId) => `/quizes/${quizId}`,
        result: (quizId) => `/quizes/${quizId}/result`
    },
    progress: {
        base: '/progress/',
        byScope: (scopeId) => `/progress/${scopeId}`
    },
    duration: (assetType, assetId) => `/duration/${assetType}/${assetId}`,
    utils: {
        step: (id, type) => `/utils/step/${id}/${type}`,
        courseByAsset: (assetType, assetId) => `/utils/${assetType}/${assetId}/course`
    },
    user: {
        enrollments: '/user/enrollments',
        badges: '/user/badges',
        enrollmentByAsset: (assetId) => `/user/enrollment/by-asset-id/${assetId}`,
        enrollment: (enrollmentId) => `/user/enrollment/${enrollmentId}`
    }
};

// Generic function for GET request
const baseUrl = __ENV.BASE_URL || 'https://liferaylmsetcnode-exte5a2learn-extprd.lfr.cloud';

export function getEndpoint(endpointFunc, ...params) {
    const endpoint = typeof endpointFunc === 'function' ? endpointFunc(...params) : endpointFunc;
    return http.get(`${baseUrl}${endpoint}`);
}

// Function to validate response
export function validateResponse(response) {
if (response.status !== 200) {
console.error(`Failed request: ${response.status} - ${response.body}`);
}
}
