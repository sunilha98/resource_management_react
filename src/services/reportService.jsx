import api from './api'; // Axios instance with interceptors

export const getBenchTrackingReport = async () => {
  const response = await api.get('/resources/bench');
  return response.data;
};

export const getSpendTrackingReport = async () => {
  const response = await api.get('/reports/spend-tracking');
  return response.data;
};
