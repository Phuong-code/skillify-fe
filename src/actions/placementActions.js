import { PLACEMENT_LIST_SUCCESS, PLACEMENT_LIST_REQUEST, PLACEMENT_LIST_FAIL } from './types';
import placementService from '../service/placementService';

const listPlacements = () => async (dispatch) => {
  try {
    dispatch({
      type: PLACEMENT_LIST_REQUEST,
    });

    const placementData = await placementService.getAllPlacements();

    dispatch({
      type: PLACEMENT_LIST_SUCCESS,
      payload: placementData,
    });
  } catch (error) {
    dispatch({ type: PLACEMENT_LIST_FAIL, payload: error.message });
  }
};

export default { listPlacements };
