import {
  PLACEMENT_LIST_REQUEST,
  PLACEMENT_LIST_SUCCESS,
  PLACEMENT_LIST_FAIL,
} from '../actions/types';

const initialState = {
  placements: [],
  loading: false,
};
const placementListReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLACEMENT_LIST_REQUEST:
      return { ...state, placements: [], loading: true };
    case PLACEMENT_LIST_SUCCESS:
      return { ...state, placements: action.payload, loading: false };
    case PLACEMENT_LIST_FAIL:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default placementListReducer;
