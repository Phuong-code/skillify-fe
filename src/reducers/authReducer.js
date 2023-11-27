import { LOGIN, LOGOUT, LOGIN_FAIL } from '../actions/types';

const initialState = {
  isLoggedIn: null,
  userInfo: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.payload,
        error: null,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
        error: 'Invalid email or password. Please try again.',
      };

    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
