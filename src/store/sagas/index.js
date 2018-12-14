import { call, put, takeEvery, select } from 'redux-saga/effects'
import { GET_LIST_OF_ACTIVITIES, ADD_ACTIVITIES, FETCHING_ACTIVITIES_FAILED, ADD_USER_STATS } from '../reducers/stats';
import { getListOfActivities as getStravaListOfActivities, getUserStats } from '../../services/strava';
import { LOGIN_SUCCESS } from '../reducers/authentication';

const selectAccessToken = ({authentication}) => authentication.accessToken;

function* getListOfActivities() {
   try {
       const accessToken = yield select(selectAccessToken);

      const activities = yield call(getStravaListOfActivities, accessToken);

      console.log('---activities', activities, '\n');

      yield put({type: ADD_ACTIVITIES, payload: {activities}});
   } catch (e) {
      yield put({type: FETCHING_ACTIVITIES_FAILED, payload: {message: e.message}});
   }
}

function* getStats() {
    try {
        const accessToken = yield select(selectAccessToken);
        const id = yield select(({authentication}) => authentication.athlete && authentication.athlete.id);

        if (accessToken && id) {
            const userStats = yield call(getUserStats, id, accessToken);
            yield put({ type: ADD_USER_STATS, payload: { userStats }})
        }
    } catch(e) {
        console.error("Error!", e.message)
    }

}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* rootSaga() {
  yield takeEvery(GET_LIST_OF_ACTIVITIES, getListOfActivities);
  yield takeEvery(LOGIN_SUCCESS, getStats)
  yield takeEvery('persist/REHYDRATE', getStats)

}

export default rootSaga;