import config from '../config.json';

const CLIENT_ID = config.clientId;
const CLIENT_SECRET = config.clientSecret;
const REDIRECT_URI = process.env.NODE_ENV !== 'production' ? `http://${window.location.hostname}:3000/tokenresponse` : "http://whatever";
const LIST_OF_ACTIVITIES = "https://www.strava.com/api/v3/athlete/activities?per_page=200";

export const STRAVA_REDIRECT_URL = `https://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}`;

export const STRAVA_AUTH = (code) =>  `https://www.strava.com/oauth/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&grant_type=authorization_code`;

export async function redirect() {
    return fetch(STRAVA_REDIRECT_URL, { mode: "no-cors" });
}

export async function auth(code) {
    return fetch(STRAVA_AUTH(code), { method: 'POST'}).then(response => response.json());
}

export async function getStats(accessToken) {
    return fetch(LIST_OF_ACTIVITIES, { headers:
        {'Authorization': `Bearer ${accessToken}`}
    }).then(response => response.json());
}