import { publicApi, authApi } from '.';

const PLACEMENT_ENDPOINT = '/api/placement';

const getAllPlacements = () => {
  return publicApi.get(`/api/placements`).then((response) => response.data);
};

const getPlacementById = async (placementId) => {
  try {
    const response = await publicApi.get(`${PLACEMENT_ENDPOINT}/${placementId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching placement by Id:', error);
    throw error;
  }
};

const createPlacement = async (formInput) => {
  try {
    const response = await authApi.post(`${PLACEMENT_ENDPOINT}/create`, formInput);
    return response.data;
  } catch (error) {
    console.error('Error adding a question:', error);
    throw error;
  }
};

const deletePlacement = async (placementId) => {
  try {
    const response = await publicApi.delete(`${PLACEMENT_ENDPOINT}/${placementId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting placement:', error);
    throw error;
  }
};

const updatePlacement = async (placementId, updatedPlacement) => {
  try {
    const response = await publicApi.put(`${PLACEMENT_ENDPOINT}/${placementId}`, updatedPlacement);
    return response.data;
  } catch (error) {
    console.error('Error updating placement:', error);
    throw error;
  }
};

const getMyPlacements = async () => {
  try {
    const response = await authApi.get(`/api/placements/my`);
    return response.data;
  } catch (error) {
    console.error('Error fetching my placements:', error);
    throw error;
  }
};

const searchPlacements = async (keyword) => {
  try {
    const response = await publicApi.get('/api/placement/search', {
      params: { keyword },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching placements:', error);
    throw error;
  }
};

const getQuizListByPlacementId = async (placementId) => {
  try {
    const response = await publicApi.get(`/api/placement/${placementId}/quiz`);
    return response.data;
  } catch (error) {
    console.error('Error fetching quizzes by placement id:', error);
    throw error;
  }
};

export default {
  getAllPlacements,
  createPlacement,
  getPlacementById,
  deletePlacement,
  updatePlacement,
  getMyPlacements,
  searchPlacements,
  getQuizListByPlacementId,
};
