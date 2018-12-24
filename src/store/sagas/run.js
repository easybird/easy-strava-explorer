import {call, put, takeEvery, select } from 'redux-saga/effects';
import {
  FETCHING_ACTIVITIES_FAILED,
} from '../reducers/stats';
import { GET_DETAIL, UPDATE_DETAIL} from '../reducers/run';
import {
    getStravaActivityDetail,
} from '../../services/strava';
import {mapDetailRunToStat} from '../mappers/strava';

const selectAccessToken = ({authentication}) => authentication.accessToken;
const selectStravaId = ({stats}, runId) => stats && stats.runs[runId] && stats.runs[runId].stravaId;

function* getDetail({ payload: { runId }}) {
  try {
    const accessToken = yield select(selectAccessToken);
    const stravaId = yield select(selectStravaId, runId);

    const run = yield call(getStravaActivityDetail, accessToken, stravaId);
    console.log('---received detail', run, '\n');

    yield put({
      type: UPDATE_DETAIL,
      payload: {detail: mapDetailRunToStat(run), runId},
    })
  } catch (e) {
    yield put({
      type: FETCHING_ACTIVITIES_FAILED,
      payload: {message: e.message},
    });
    throw e;
  }
}


const runSaga = [
  takeEvery(GET_DETAIL, getDetail)
]

export default runSaga;
