export const FETCH_ACTIVITIES = 'FETCH_ACTIVITIES';
export const ADD_ACTIVITIES = 'ADD_ACTIVITIES';
export const FETCHING_ACTIVITIES_FAILED = 'FETCHING_ACTIVITIES_FAILED';
export const ADD_USER_STATS = 'ADD_USER_STATS';

const initialState = {
  isFetching: 0,
  error: null,
};

const stats = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACTIVITIES:
      return {...state, isFetching: state.isFetching + 1};
    case ADD_ACTIVITIES:
      return {
        ...state,
        isFetching: state.isFetching - 1,
      };
    case FETCHING_ACTIVITIES_FAILED:
      return {
        isFetching: state.isFetching - 1,
        error: action.payload && action.payload.message,
      };
    default:
      return state;
  }
};

export default stats;
