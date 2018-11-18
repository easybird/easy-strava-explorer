export const GET_LIST_OF_ACTIVITIES = 'GET_LIST_OF_ACTIVITIES';
export const ADD_ACTIVITIES = 'ADD_ACTIVITIES';
export const FETCHING_ACTIVITIES_FAILED = 'FETCHING_ACTIVITIES_FAILED';
export const ADD_USER_STATS = 'ADD_USER_STATS';

const initialState = {
  isFetching: 0,
  userStats: null,
  activities: [],
  error: null,
};

const stats = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_OF_ACTIVITIES:
      return {...state, isFetching: state.isFetching + 1};
    case ADD_USER_STATS:
      return {
          ...state,
          userStats: action.payload && action.payload.userStats
      }
    case ADD_ACTIVITIES:
      return {
        ...state,
        activities: action.payload ? [...state.activities, ...action.payload.activities] : state.activities,
        isFetching: state.isFetching - 1,
      };
    case FETCHING_ACTIVITIES_FAILED:
      return {
        ...state,
        isFetching: state.isFetching - 1,
        error: action.payload && action.payload.message,
      };
    default:
      return state;
  }
};

export default stats;
