import http from 'k6/http';

export const endpoints = {
    courses: '/o/c/courses/scopes/32483059?page=1&pageSize=3&fields=audience,description,durationMinutes,id,level,title&sort=position:asc',
    learnPaths: '/o/c/learningpaths/scopes/32483059?page=1&pageSize=3&fields=id,description,level,persons,title',
    menuCourses: '/menu/34152836/lesson/course',
    enrollments: '/comments'
};

// Função genérica para requisição GET
export function getEndpoint(endpoint) {
    const baseUrl = __ENV.BASE_URL || 'https://learn-uat.liferay.com';  // URL vinda de __ENV ou valor padrão
    return http.get(`${baseUrl}${endpoint}`);
}

// Função para validar resposta
export function validateResponse(response) {
    if (response.status !== 200) {
        console.error(`Failed request: ${response.status} - ${response.body}`);
    }
}
