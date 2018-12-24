import {LOGOUT_SUCCESS} from './authentication';
import runReducer, { ADD_RUNS } from './run';

export const FETCH_ACTIVITIES = 'FETCH_ACTIVITIES';
export const ADD_ACTIVITIES = 'ADD_ACTIVITIES';
export const FETCHING_ACTIVITIES_FAILED = 'FETCHING_ACTIVITIES_FAILED';
export const ADD_USER_STATS = 'ADD_USER_STATS';
export const FETCHED_ALL_STATS = 'FETCHED_ALL_STATS';
export const GET_RUNS_WITH_PHOTO = 'GET_RUNS_WITH_PHOTO';
export const UPDATE_SPECIAL_REQUEST = 'UPDATE_SPECIAL_REQUEST';
export const SPECIAL_REQUEST_BUSY = 'SPECIAL_REQUEST_BUSY';

const PER_PAGE_REQUESTS = 30;

const initialState = {
  userStats: null,
  activities: [],
  pageData: {
    perPage: PER_PAGE_REQUESTS,
    page: 0,
  },
  runs: {},
  hasAllStats: false,
  specialRequests: {}
};

const stats = (state = initialState, action) => {
  if (action.payload && action.payload.runId) {
    return {
      ...state,
      runs: {
        ...state.runs,
        [action.payload.runId]: state.runs[action.payload.runId]
          ? runReducer(state.runs[action.payload.runId], action)
          : runReducer(null, action.payload),
      },
    };
  }
  switch (action.type) {
    case ADD_USER_STATS:
      return {
        ...state,
        userStats: action.payload && action.payload.userStats,
      };
    case ADD_ACTIVITIES:
      return {
        ...state,
        activities: action.payload
          ? [...state.activities, ...action.payload.activities]
          : state.activities,
      };
    case LOGOUT_SUCCESS:
      return {
        ...initialState,
      };
    case ADD_RUNS: {
      return Object.entries(action.payload.runs).reduce(
        (newState, [key, run]) => ({
          ...newState,
          runs: {...newState.runs, [key]: runReducer(undefined, {...action, payload: { ...action.payload, run}})},
        }),
        {
          ...state,
          pageData: {...state.pageData, page: action.payload.page},
        }
      );
    }
    case FETCHED_ALL_STATS:
      return {
        ...state,
        hasAllStats: true,
        totalStats: Object.keys(state.runs).length,
      };
    case GET_RUNS_WITH_PHOTO:
      return {
        ...state,
        specialRequests: {
          ...state.specialRequests,
          [action.payload.specialRequestKey]: SPECIAL_REQUEST_BUSY
        }
      };
    case UPDATE_SPECIAL_REQUEST:
      return {
        ...state,
        specialRequests: {
          ...state.specialRequests,
          [action.payload.specialRequestKey]: action.payload.response
        }
      }
    default:
      return state;
  }
};

export default stats;
