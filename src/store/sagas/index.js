import {all} from 'redux-saga/effects';
import statsSaga from "./stats";
import runSaga from "./run";

export default function* rootSaga() {
  yield all([
    statsSaga,
    runSaga
  ])
};
