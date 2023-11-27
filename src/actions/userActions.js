import userService from '../service/userService';

import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL } from './types';

const registerUser = (userRegisterDto) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const registeredUser = await userService.register(userRegisterDto);
    dispatch({ type: REGISTER_SUCCESS, payload: registeredUser });
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error.message });
  }
};

export default registerUser;
