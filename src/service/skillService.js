import { publicApi } from '.';

const SKILL_ENDPOINT = '/api/skill';

const SkillService = {
  getAllSkills: async () => {
    try {
      const response = await publicApi.get(SKILL_ENDPOINT);
      return response.data;
    } catch (error) {
      console.error('Error fetching skills:', error);
      throw error;
    }
  },

  addSkill: async (newSkill) => {
    try {
      const response = await publicApi.post(SKILL_ENDPOINT, newSkill);
      return response.data;
    } catch (error) {
      console.error('Error adding skills:', error);
      throw error;
    }
  },

  deleteSkill: async (skillId) => {
    try {
      const response = await publicApi.delete(`${SKILL_ENDPOINT}/${skillId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting skill:', error);
      throw error;
    }
  },

  getSkillsWithNoQuiz: async () => {
    try {
      const response = await publicApi.get(`${SKILL_ENDPOINT}/not-in-any-quiz`);
      return response.data;
    } catch (error) {
      console.error('Error fetching skills with no quiz:', error);
      throw error;
    }
  },

  searchSkills: async (keyword) => {
    try {
      const response = await publicApi.get(`${SKILL_ENDPOINT}/search`, {
        params: { keyword },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching skills:', error);
      throw error;
    }
  },

  updateSkill: async (skillId, updatedSkill) => {
    try {
      const response = await publicApi.put(`${SKILL_ENDPOINT}/${skillId}`, updatedSkill);
      return response.data;
    } catch (error) {
      console.error('Error updating skill:', error);
      throw error;
    }
  },
};

export default SkillService;
