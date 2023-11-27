import { authApi } from '.';

const QUESTION_ENDPOINT = '/api/question';

const addSAQs = async (questions) => {
  try {
    const response = await authApi.post(`${QUESTION_ENDPOINT}/shortanswer-questions`, questions);
    return response.data;
  } catch (error) {
    console.error('Error adding a question:', error);
    throw error;
  }
};

const addQuestions = async (questions) => {
  try {
    const response = await authApi.post(`${QUESTION_ENDPOINT}`, questions);
    return response.data;
  } catch (error) {
    console.error('Error adding a question:', error);
    throw error;
  }
};

export default { addSAQs, addQuestions };
