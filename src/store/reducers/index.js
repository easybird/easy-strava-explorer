import { combineReducers } from 'redux'
import authentication from './authentication';
import stats from './stats';

export default combineReducers({
  authentication,
  stats
})