import { LOGIN, LOGOUT, LOGIN_FAIL } from './types';
import { publicApi } from '../service';
import readUserInfoFromJwtToken from '../utils';

export const logout = () => {
  localStorage.removeItem('refreshToken');

  return {
    type: LOGOUT,
  };
};

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await publicApi.post('/login', { email, password });
    const { refreshToken } = response.data;
    localStorage.setItem('refreshToken', refreshToken);

    const userInfo = readUserInfoFromJwtToken(refreshToken);
    dispatch({ type: LOGIN, payload: userInfo });
  } catch (error) {
    console.error('Error during login:', error);
    dispatch({ type: LOGIN_FAIL });
  }
};

export const refreshAccessToken = () => async (dispatch) => {
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    await publicApi.post('/api/auth/refresh', { refreshToken });
  } catch (error) {
    // If the refresh fails, dispatch the logout action to clear the authentication state
    dispatch(logout());
  }
};

export const checkLoginState = () => async (dispatch) => {
  await dispatch(refreshAccessToken());
  if (localStorage.getItem('refreshToken')) {
    const userInfo = readUserInfoFromJwtToken(localStorage.getItem('refreshToken'));
    dispatch({ type: LOGIN, payload: userInfo });
  }
};
