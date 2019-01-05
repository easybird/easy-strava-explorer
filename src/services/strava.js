import config from '../config.json';

const CLIENT_ID = config.clientId;
const BASE_STRAVA_URL = 'https://www.strava.com';
const BASE_API_URL = `${BASE_STRAVA_URL}/api/v3`;
const ATHLETE_URL = `${BASE_API_URL}/athlete`;
const ACTIVITIES_URL = `${BASE_API_URL}/activities`;
const CURRENT_ATHLETE_URL = id => `${BASE_STRAVA_URL}/api/v3/athletes/${id}`;
const GET_USER_STATS = id => `${CURRENT_ATHLETE_URL(id)}/stats`;
const STRAVA_EXPLORER_URL = code => `https://europe-west1-strava-explorer.cloudfunctions.net/strava-authenticator?code=${code}`;

const REDIRECT_URI =
  process.env.NODE_ENV !== 'production'
    ? `http://${window.location.hostname}:3000/tokenresponse`
    : 'http://whatever';

const LIST_OF_ACTIVITIES = ({ perPage, page}) => `${ATHLETE_URL}/activities?per_page=${perPage}&page=${page}`;
const ACTIVITY_DETAIL = (runId) => `${ACTIVITIES_URL}/${runId}`;

export const STRAVA_REDIRECT_URL = `${BASE_STRAVA_URL}/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}`;

export async function redirect() {
  return fetch(STRAVA_REDIRECT_URL, {mode: `no-cors`});
}

export async function auth(code) {
  const response = await fetch(STRAVA_EXPLORER_URL(code));
      const jsonResponse = await response.json();
      return jsonResponse;
}

export async function getUserStats(id, accessToken) {
  return fetch(GET_USER_STATS(id), {
    headers: {Authorization: `Bearer ${accessToken}`},
  }).then(response => response.json());
}

export async function fetchActivities(accessToken, { perPage, page}) {
  return fetch(LIST_OF_ACTIVITIES({perPage, page}), {
    headers: {Authorization: `Bearer ${accessToken}`},
  }).then(response => {
    if (response.status !== 200 && response.status !== 201) {
      console.error('fetchActivities failed with', response.status, '\n');

      return response.json().then(jsonResponse => {
        throw jsonResponse;
      });
    }
    return response.json();
  });
}

export async function getStravaActivityDetail(accessToken, runId) {
  return fetch(ACTIVITY_DETAIL(runId), {
    headers: {Authorization: `Bearer ${accessToken}`},
  }).then(response => {
    if (response.status !== 200 && response.status !== 201) {
      console.error('Get Run Detail failed with', response.status, '\n');

      return response.json().then(jsonResponse => {
        throw jsonResponse;
      });
    }
    return response.json();
  });
}