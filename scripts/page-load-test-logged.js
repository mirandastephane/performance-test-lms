import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 10,            // Number of virtual users
    duration: '30s',    // Duration of the test
};

const BASE_URL = 'https://learn.liferay.com';
let responseTimes = {}; // Initializes an object to store response times

// Main test function
export default function () {
    // Sets up the necessary headers
    const headers = {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'en-US,en;q=0.9,pt;q=0.8',
        'cache-control': 'max-age=0',
        'cookie': '_hjSessionUser_1015010=eyJpZCI6ImJhNzZkOTZiLWViYzUtNThlNy1hNzQzLTU0YzBhMzRiNzUwZiIsImNyZWF0ZWQiOjE2OTY0NjQ5Mjg3MTQsImV4aXN0aW5nIjp0cnVlfQ==; GUEST_LANGUAGE_ID=en_US; _mkto_trk=id:212-DQY-814&token:_mch-liferay.com-1696854059157-83246; __zlcmid=1JQmMYlrYkqpiEv; _hjSessionUser_775914=eyJpZCI6Ijc0YzVmNTMwLWEzNmEtNTg5MS1iNWM3LTc4NWYyODgwMzJkYSIsImNyZWF0ZWQiOjE3MDYwNDcyMzYxNDAsImV4aXN0aW5nIjp0cnVlfQ==; CONSENT_TYPE_FUNCTIONAL=true; CONSENT_TYPE_PERFORMANCE=true; CONSENT_TYPE_PERSONALIZATION=true; CONSENT_TYPE_NECESSARY=true; USER_CONSENT_CONFIGURED=true; _ga_RELTWBCMQ7=deleted; _hjSessionUser_946105=eyJpZCI6ImZlNDc1ZmUyLWExMTItNWJkYi04OGI1LWJjZDhmNzcyNmVmYyIsImNyZWF0ZWQiOjE3MTAzMzMyMjQ0MjQsImV4aXN0aW5nIjp0cnVlfQ==; LFR_SESSION_STATE_3190015=1715196548744; LFR_SESSION_STATE_32483023=1715281029915; ajs_anonymous_id=762a1598-1be2-4d7c-b479-6a8d074221ec; ajs_user_id=356022; _hjSessionUser_1172501=eyJpZCI6ImQ4NTJiOGE4LWNhNmMtNWM5ZC1iMDRhLTg4ODQ3MzIxNjNlZiIsImNyZWF0ZWQiOjE3MTc2ODgyOTI1NTgsImV4aXN0aW5nIjp0cnVlfQ==; _hp2_id.4217846924=%7B%22userId%22%3A%228185277503219411%22%2C%22pageviewId%22%3A%223593894789867558%22%2C%22sessionId%22%3A%222937247041168801%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; amp_710046=UdsqSZ0iVRJsXjgyQcRx88...1i29viq03.1i29vl87d.1.1.2; _ga_9WXYK3PMB6=GS1.1.1720534924.36.1.1720534963.21.0.0; _ga_devcon=GS1.1.1725037714.1.0.1725037714.0.0.0; ac_client_user_id=dd62eb15-1be2-4d7c-b479-6a8d074221ec; COOKIE_SUPPORT=true; _ga_1EB5NYHXYT=GS1.1.1728412831.3.0.1728412831.0.0.0; OptanonAlertBoxClosed=2024-10-17T17:26:01.286Z; _ga_WME6CS1BX4=GS1.1.1729515836.33.0.1729515836.60.0.0; _ga=GA1.1.119045206.1726063093; _ga_F1NGGL40S3=GS1.1.1729793794.19.0.1729793794.0.0.0; OptanonConsent=isGpcEnabled=0&datestamp=Fri+Oct+25+2024+10%3A05%3A23+GMT-0300+(Brasilia+Standard+Time)&version=6.30.0&geolocation=BR%3BPE&isIABGlobal=false&hosts=&consentId=e39228e3-0e58-45d2-b009-deff1439b56d&interactionCount=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A0%2CC0003%3A0%2CC0004%3A0&AwaitingReconsent=false; SERVER_ID=be81c3bd118c18fe; LFR_SESSION_STATE_23484911=1730125383674; SAML_SP_SESSION_KEY=_2fc9dffa963d5d90419826c38823b984589554697f8e6d82b58c5dc7561d; JSESSIONID=B9A9A392F4053008BECB9D19E9EE0F84; _ga_RELTWBCMQ7=GS1.1.1730140067.91.1.1730140146.0.0.0; LFR_SESSION_STATE_26733261=1730140774951',
        'priority': 'u=0, i',
        'referer': 'https://learn.liferay.com/l/27257358',
        'sec-ch-ua': '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Linux"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
    };

    // Makes the GET request
    const response = http.get(`${BASE_URL}/user-dashboard`, { headers });

    // Stores the response time
    const time = response.timings.duration;
    const path = '/user-dashboard';
    if (!responseTimes[path]) {
        responseTimes[path] = []; // Initializes an array for the path if it doesn't exist
    }
    responseTimes[path].push(time); // Adds the response time to the array

    // Checks the response status
    check(response, {
        'status is 200': (r) => r.status === 200,
        'response time is less than 2000ms': (r) => time < 2000,
    });

    if (time > 2000) {
        console.log(`Warning: ${response.url} took ${time.toFixed(2)} ms to load.`);
    }

    // Waits for one second before repeating
    sleep(1);
}
