import {call, put, takeEvery, select, fork} from 'redux-saga/effects';
import {
  FETCH_ACTIVITIES,
  FETCHING_ACTIVITIES_FAILED,
  ADD_USER_STATS,
  FETCHED_ALL_STATS,
  GET_RUNS_WITH_PHOTO,
  UPDATE_SPECIAL_REQUEST
} from '../reducers/stats';
import {ADD_RUNS} from '../reducers/run';
import {
  fetchActivities as getStravaListOfActivities,
  getUserStats,
} from '../../services/strava';
import {LOGIN_SUCCESS} from '../reducers/authentication';
import mapActivitiesToStats from '../mappers/strava';

const selectAccessToken = ({authentication}) => authentication.accessToken;
const selectPageData = ({stats}) => stats && stats.pageData;
const selectHasAllStats = ({stats}) => stats && stats.hasAllStats;
const selectLastRunsWithPhoto = ({stats}, totalRuns) => {
  if (!stats.runs) {
    return null;
  }
  const runsWithPhoto = Object.entries(stats.runs)
    .filter(([, value]) => value.hasPhoto)
    .map(([key]) => key)
    .sort((firstKey, secondKey) => secondKey - firstKey);

  if (runsWithPhoto.length >= totalRuns) {
    return runsWithPhoto.slice(0, totalRuns);
  }
  return runsWithPhoto;
};

// eslint-disable-next-line no-unused-vars
function* fetchAllActivities() {
  yield call(fetchActivities);
  const hasAllStats = select(selectHasAllStats);
  if (!hasAllStats) {
    yield fork(fetchAllActivities);
  }
}

function* fetchActivities() {
  try {
    const accessToken = yield select(selectAccessToken);
    const pageData = yield select(selectPageData);
    const page = pageData.page + 1;

    console.log('---page update', page, '\n');

    const activities = yield call(getStravaListOfActivities, accessToken, {
      perPage: pageData.perPage,
      page,
    });
    console.log('---received activities', activities, '\n');


    // yield put({type: ADD_ACTIVITIES, payload: {activities}});
    yield put({
      type: ADD_RUNS,
      payload: {runs: mapActivitiesToStats(activities), page},
    });
    if (activities.length < pageData.perPage) {
      console.log('---received all data' , '\n');

      yield put({
        type: FETCHED_ALL_STATS,
      });
    }
  } catch (e) {
    yield put({
      type: FETCHING_ACTIVITIES_FAILED,
      payload: {message: e.message},
    });
    throw e;
  }
}

function* getStats() {
  try {
    const accessToken = yield select(selectAccessToken);
    const id = yield select(
      ({authentication}) => authentication.athlete && authentication.athlete.id
    );

    if (accessToken && id) {
      const userStats = yield call(getUserStats, id, accessToken);
      yield put({type: ADD_USER_STATS, payload: {userStats}});
    }
  } catch (e) {
    console.error('Error!', e.message);
  }
}

function* getRunsWithPhoto(action) {
  const updateRunsWithPhotoAction = response => ({
    type: UPDATE_SPECIAL_REQUEST,
    payload: {
      specialRequestKey: action.payload.specialRequestKey,
      response,
    },
  });
  const lastRunsWithPhoto = yield select(
    selectLastRunsWithPhoto,
    action.payload.totalRuns
  );
  const hasAllStats = yield select(selectHasAllStats);
  if (hasAllStats) {
    if (!lastRunsWithPhoto || lastRunsWithPhoto.length === 0) {
      console.log('---no stats with photo', '\n');
      yield put(updateRunsWithPhotoAction([]));
      return null;
    }
  }
  if (
    !lastRunsWithPhoto ||
    lastRunsWithPhoto.length < action.payload.totalRuns
  ) {
    try {
      yield call(fetchActivities);
      yield fork(getRunsWithPhoto, action);
      return null;
    } catch(e) {
      console.error(e);
      throw e;
    }
  }
  yield put(yield put(updateRunsWithPhotoAction(lastRunsWithPhoto)));
  return null;
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
const statsSaga = [
  takeEvery(FETCH_ACTIVITIES, fetchActivities),
  takeEvery(LOGIN_SUCCESS, getStats),
  takeEvery(GET_RUNS_WITH_PHOTO, getRunsWithPhoto),
  // yield takeEvery('persist/REHYDRATE', getStats);
  //   yield takeEvery(LOGIN_SUCCESS, fetchAllActivities);
]
export default statsSaga;