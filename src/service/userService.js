import { authApi, publicApi } from '.';

const register = (userRegisterDto) =>
  publicApi.post('/api/user', userRegisterDto).then((response) => response.data);

const updateInformation = (userProfileUpdateDto) =>
  authApi.put(`/api/user/edit-profile`, userProfileUpdateDto).then((response) => response.data);

const updatePassword = (newPassword) =>
  authApi.put(`/api/user/edit-password`, newPassword).then((response) => response.data);

const getTraineeFullInfo = (email) =>
  authApi.get(`/api/user/trainee/${email}`).then((response) => response.data);

const getlistUserByRole = (role) =>
  publicApi.get(`/api/user/filter-by/${role}`).then((response) => response.data);

const getAuthenticatedTrainer = () =>
  publicApi.get(`/api/user/authenticated/Trainer`).then((response) => response.data);

const getAuthenticatedSales = () =>
  publicApi.get(`/api/user/authenticated/Sales`).then((response) => response.data);

export default {
  register,
  updateInformation,
  updatePassword,
  getTraineeFullInfo,
  getlistUserByRole,
  getAuthenticatedTrainer,
  getAuthenticatedSales,
};
