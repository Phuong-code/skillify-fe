import { combineReducers } from 'redux';
import userRegisterReducer from './userReducer';
import authReducer from './authReducer';
import placementListReducer from './placementReducer';

const rootReducer = combineReducers({
  userRegister: userRegisterReducer,
  auth: authReducer,
  placementList: placementListReducer,
});

export default rootReducer;
