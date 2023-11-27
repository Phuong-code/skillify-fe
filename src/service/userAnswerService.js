import { authApi } from '.';

const USERANSWER_ENDPOINT = '/api/userAnswer';

const addUserAnswer = async (userAnswer) => {
  return authApi.post(`${USERANSWER_ENDPOINT}`, userAnswer).then((response) => response.data);
};

const getAnswersByResultId = async (resultId) => {
  return authApi
    .get(`${USERANSWER_ENDPOINT}/quizResult/${resultId}`)
    .then((response) => response.data);
};

const updateMarks = async (resultId, userAnswer) => {
  return authApi
    .put(`${USERANSWER_ENDPOINT}/quizResult/${resultId}`, userAnswer)
    .then((response) => response.data);
};

export default { addUserAnswer, getAnswersByResultId, updateMarks };
