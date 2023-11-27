import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';

const initialState = {
  registeredUser: null,
  loading: false,
  error: null,
};

const userRegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { ...state, loading: true, error: null };
    case REGISTER_SUCCESS:
      return { ...state, loading: false, registeredUser: action.payload };
    case REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default userRegisterReducer;
