export const GET_LIST_OF_ACTIVITIES = "GET_LIST_OF_ACTIVITIES";
export const ADD_ACTIVITIES = "ADD_ACTIVITIES";

const initialState = {
    isFetching: 0
};

const stats = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_OF_ACTIVITIES:
    return { ...state, isFetching: state.isFetching + 1}
    case ADD_ACTIVITIES:
    return {
        ...state,
        isFetching: state.isFetching - 1
    }
    default:
      return state;
  }
};

export default stats;
