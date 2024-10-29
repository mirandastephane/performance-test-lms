import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Counter } from 'k6/metrics';

const loginUrl = 'https://learn.liferay.com/c/portal/login?p_l_id=5299';
const dashboardUrl = 'https://learn.liferay.com/user-dashboard';
const username = 'your-user';
const password = 'your-password';

    // Custom metric for response time of the main page
const responseTime = new Trend('response_time_dashboard');

export let options = {
    stages: [
        { duration: '30s', target: 10 }, // Start with 10 users
        { duration: '30s', target: 20 }, // Ramp up to 20 users
        { duration: '30s', target: 0 },  // End the test
    ],
};

export default function () {
    // Login
    let loginRes = http.post(loginUrl, {
        username: username,
        password: password,
    });

    check(loginRes, {
        'login successful': (res) => res.status === 200,
    });

    // Session cookie
    let authCookie = loginRes.cookies['JSESSIONID'][0].value;

    // Access dashboard page with session cookie
    let dashboardRes = http.get(dashboardUrl, {
        headers: {
            'Cookie': `JSESSIONID=${authCookie}`,
        },
    });

    // Collect response time
    const time = dashboardRes.timings.duration;

    // Check page status and collect response time
    check(dashboardRes, {
        'status is 200': (res) => res.status === 200,
        'response time is less than 2000ms': (r) => time < 2000,
    });

    responseTime.add(time);

    sleep(1); // Pause for 1 second between iterations
}

