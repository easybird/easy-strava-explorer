import { LOGOUT_SUCCESS } from "./authentication";

export const GET_LIST_OF_ACTIVITIES = 'GET_LIST_OF_ACTIVITIES';
export const ADD_ACTIVITIES = 'ADD_ACTIVITIES';
export const FETCHING_ACTIVITIES_FAILED = 'FETCHING_ACTIVITIES_FAILED';
export const ADD_USER_STATS = 'ADD_USER_STATS';

const initialState = {
  userStats: null,
  activities: [],
};

const stats = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_STATS:
      return {
          ...state,
          userStats: action.payload && action.payload.userStats
      }
    case ADD_ACTIVITIES:
      return {
        ...state,
        activities: action.payload ? [...state.activities, ...action.payload.activities] : state.activities,
      };
      case LOGOUT_SUCCESS:
      return {
        ...state,
        activities: [],
        userStats: null,
      };
    default:
      return state;
  }
};

export default stats;
