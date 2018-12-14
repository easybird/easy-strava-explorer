import config from '../config.json';

const CLIENT_ID = config.clientId;
const CLIENT_SECRET = config.clientSecret;
const BASE_STRAVA_URL = "https://www.strava.com";
const ATHLETE_URL = `${BASE_STRAVA_URL}/api/v3/athlete`;
const CURRENT_ATHLETE_URL = (id) => `${BASE_STRAVA_URL}/api/v3/athletes/${id}`;
const GET_USER_STATS = (id) => `${CURRENT_ATHLETE_URL(id)}/stats`;

const REDIRECT_URI = process.env.NODE_ENV !== 'production' ? `http://${window.location.hostname}:3000/tokenresponse` : "http://whatever";

const LIST_OF_ACTIVITIES = `${ATHLETE_URL}/activities?per_page=300`;

export const STRAVA_REDIRECT_URL = `${BASE_STRAVA_URL}/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}`;

export const STRAVA_AUTH = (code) =>  `${BASE_STRAVA_URL}/oauth/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&grant_type=authorization_code`;

export async function redirect() {
    return fetch(STRAVA_REDIRECT_URL, { mode: `no-cors` });
}

export async function auth(code) {
    return fetch(STRAVA_AUTH(code), { method: 'POST'}).then(response => response.json());
}

export async function getUserStats(id, accessToken) {
    return fetch(GET_USER_STATS(id), { headers:
        {'Authorization': `Bearer ${accessToken}`}
    }).then(response => response.json());
}

export async function getListOfActivities(accessToken) {
    return fetch(LIST_OF_ACTIVITIES, { headers:
        {'Authorization': `Bearer ${accessToken}`}
    }).then(response => response.json()).then(response => {
        return response
    });
}