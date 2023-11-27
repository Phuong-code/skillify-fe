import { publicApi, authApi } from '.';

const QUIZ_ENDPOINT = '/api/quiz';

const QuizService = {
  getAllQuizzes: async () => {
    try {
      const response = await publicApi.get(QUIZ_ENDPOINT);
      return response.data;
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      throw error;
    }
  },

  addTechQuiz: async (newQuiz) => {
    try {
      const response = await authApi.post(`${QUIZ_ENDPOINT}/tech-quiz`, newQuiz);
      return response.data;
    } catch (error) {
      console.error('Error adding a quiz:', error);
      throw error;
    }
  },

  addClientQuiz: async (newQuiz) => {
    try {
      const response = await authApi.post(`${QUIZ_ENDPOINT}/client-quiz`, newQuiz);
      return response.data;
    } catch (error) {
      console.error('Error adding a quiz:', error);
      throw error;
    }
  },

  deleteQuiz: async (quizId) => {
    try {
      const response = await authApi.delete(`${QUIZ_ENDPOINT}/${quizId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting a quiz:', error);
      throw error;
    }
  },

  getQuizById: async (quizId) => {
    try {
      const response = await publicApi.get(`${QUIZ_ENDPOINT}/${quizId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching skills by Id', error);
      throw error;
    }
  },

  getQuizQuestions: async (quizId) => {
    try {
      const response = await publicApi.get(`${QUIZ_ENDPOINT}/${quizId}/questions`);
      return response.data;
    } catch (error) {
      console.error('Error fetching quizId questions', error);
      throw error;
    }
  },
  submitQuizAnswers: async (quizId, userAnswer) => {
    try {
      const response = await authApi.post(`${QUIZ_ENDPOINT}/${quizId}/submit`, userAnswer);
      return response.data;
    } catch (error) {
      console.error('Error submiting quiz answers', error);
      throw error;
    }
  },
  getMyQuizzes: async () => {
    try {
      const response = await authApi.get(`${QUIZ_ENDPOINT}/my`);
      return response.data;
    } catch (error) {
      console.error('Error fetching my quizzes:', error);
      throw error;
    }
  },

  updateQuiz: async (quiz) => {
    try {
      const response = await authApi.patch(`${QUIZ_ENDPOINT}/${quiz.id}`, quiz);
      return response.data;
    } catch (error) {
      console.error('Error updating a quiz:', error);
      throw error;
    }
  },

  updateQuestions: async (quizId, questions) => {
    try {
      const response = await authApi.patch(`${QUIZ_ENDPOINT}/${quizId}/questions`, questions);
      return response.data;
    } catch (error) {
      console.error('Error updating questions:', error);
      throw error;
    }
  },

  deleteQuestions: async (quizId, questionIds) => {
    try {
      const response = await authApi.delete(`${QUIZ_ENDPOINT}/${quizId}/questions`, {
        data: questionIds,
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting questions:', error);
      throw error;
    }
  },

  searchTechQuizzes: async (keyword) => {
    try {
      const response = await publicApi.get(`${QUIZ_ENDPOINT}/tech-quiz/search`, {
        params: { keyword },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching quizzes:', error);
      throw error;
    }
  },

  getUnmarkedResults: async () => {
    try {
      const response = await authApi.get(`${QUIZ_ENDPOINT}/unmarked`);
      return response.data;
    } catch (error) {
      console.error('Error fetching unmarked results:', error);
      throw error;
    }
  },

  getResults: async () => {
    try {
      const response = await authApi.get(`${QUIZ_ENDPOINT}/all-results`);
      return response.data;
    } catch (error) {
      console.error('Error fetching results:', error);
      throw error;
    }
  },
};

export default QuizService;
