import { authApi, publicApi } from '.';

const REQUEST_ENDPOINT = '/api/request';

const RequestSerivce = {
  traineeRequestSkill: async (requestSkill) => {
    try {
      const response = await authApi.post(`${REQUEST_ENDPOINT}/traineeRequestSkill`, requestSkill);
      return response.data;
    } catch (error) {
      console.error('Error requesting skills', error);
      throw error;
    }
  },
  getAllRequestReceivedByUser: async () => {
    try {
      const response = await authApi.get(`${REQUEST_ENDPOINT}/received`);
      return response.data;
    } catch (error) {
      console.error('Error getting request');
      throw error;
    }
  },
  getAllRequestSentByUser: async () => {
    try {
      const response = await authApi.get(`${REQUEST_ENDPOINT}/sent`);
      return response.data;
    } catch (error) {
      console.error('Error getting request');
      throw error;
    }
  },
  trainerProcessSkillRequest: async (process, value) => {
    try {
      const response = await authApi.post(
        `${REQUEST_ENDPOINT}/ProcessSkillRequest/${value}`,
        process,
      );
      return response.data;
    } catch (error) {
      console.error('Error processing request', error);
      throw error;
    }
  },
  requestAuthentication: async (requestAuth) => {
    try {
      const response = await authApi.post(`${REQUEST_ENDPOINT}/RequestAuthentication`, requestAuth);
      return response.data;
    } catch (error) {
      console.error('Error processing request', error);
      throw error;
    }
  },
  processAuthenticationRequest: async (process, valueBoolean) => {
    try {
      const response = await authApi.post(
        `${REQUEST_ENDPOINT}/ProcessRequestAuthentication/${valueBoolean}`,
        process,
      );
      return response.data;
    } catch (error) {
      console.error('Error processing request', error);
      throw error;
    }
  },
  deleteNotification: async (notificationid) => {
    try {
      const response = await publicApi.delete(`${REQUEST_ENDPOINT}/delete/${notificationid}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting skill:', error);
      throw error;
    }
  },
};

export default RequestSerivce;
