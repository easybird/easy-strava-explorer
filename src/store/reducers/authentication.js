export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

const initialState = {
  authenticated: false,
  athlete: null,
  accessToken: null,
};

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        athlete: action.payload.athlete,
        accessToken: action.payload.accessToken,
        authenticated: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        authenticated: false,
        athlete: null,
        accessToken: null,
      };
    default:
      return state;
  }
};

export default authentication;
