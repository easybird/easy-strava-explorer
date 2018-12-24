export const ADD_RUNS = 'ADD_RUNS';
export const GET_DETAIL = "GET_DETAIL"
export const UPDATE_DETAIL = "UPDATE_DETAIL"

const initialState = {
    hasDetail: false,
    isFetching: false
};
function runReducer(state = initialState, action) {
    console.log('---runReducer!', action, '\n');

    switch(action.type) {
        case ADD_RUNS:
            return {
                ...state,
                ...action.payload.run
            }
        case GET_DETAIL: {
            return {
                ...state,
                isFetching: true
            }
        }
        case UPDATE_DETAIL: {
            console.log('wut', action.payload.detail)
            return {
                ...state,
                isFetching: false,
                hasDetail: true,
                ...action.payload.detail
            }
        }
        default:
            return state;
    }
}

export default runReducer;
