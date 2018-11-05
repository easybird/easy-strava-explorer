const initialState = {
  authenticated: false,
  athlete: null,
  accessToken: null,
};

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
      };
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default authentication;
