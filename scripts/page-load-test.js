import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'https://learn.liferay.com';

// Paths to be tested
const paths = [
    '/education/index', // Landing Page
    '/education/courses', // Course Page
    '/education/learning-paths', // Learn Path Page
    '/l/26502895', // Building Enterprise Websites with Liferay Course
    '/l/26590518', // Business Sales Learn Path
    '/l/27257358', // Knowledge Check
    '/w/liferay-cloud/getting-started', // Liferay Learn Page
    '/w/dxp/content-authoring-and-management/asset-libraries/asset-library-content', // Liferay Learn Page
];

// Test configuration
export const options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(90)<2000'],
    },
};

// Object to store response times
let responseTimes = {};

// Main test function
export default function () {
    paths.forEach((path) => {
        const url = `${BASE_URL}${path}`;
        const response = http.get(url);
        const duration = response.timings.duration;

        if (!responseTimes[path]) {
            responseTimes[path] = [];
        }
        responseTimes[path].push(duration);

        check(response, {
            'status is 200': (r) => r.status === 200,
            'response time is less than 2000ms': (r) => duration < 2000,
        });

        if (duration > 2000) {
            console.log(`Warning: ${url} took ${duration.toFixed(2)} ms to load.`);
        }

        sleep(1);
    });

    // Call handleSummary after the loop and pass responseTimes
    const summary = handleSummary(responseTimes);
    console.log(summary.stdout);
}

// Function to calculate average and sort URLs by response time
export function handleSummary(data) {
    // Calculate average response time for each URL
    let avgResponseTimes = Object.entries(responseTimes).map(([path, times]) => {
        const total = times.reduce((sum, time) => sum + time, 0);
        const avgTime = total / times.length;
        return { path, avgTime };
    });

    // Sort by average response time (ascending)
    avgResponseTimes.sort((a, b) => a.avgTime - b.avgTime);

    // Build summary string
    let summary = '\nAverage Load Time for Each URL (Fastest to Slowest):\n';
    avgResponseTimes.forEach(({ path, avgTime }) => {
        summary += `${BASE_URL}${path} - Average Load Time: ${avgTime.toFixed(2)} ms\n`;
    });

    console.log(summary);

    return { stdout: summary };
}
