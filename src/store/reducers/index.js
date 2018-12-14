import { combineReducers } from 'redux'
import authentication from './authentication';
import stats from './stats';
import ui from './ui';

export default combineReducers({
  authentication,
  stats,
  ui
})