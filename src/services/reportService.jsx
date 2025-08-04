import api from './api'; // Axios instance with interceptors

export const getBenchTrackingReport = async () => {
  const response = await api.get('/reports/bench-tracking');
  return response.data;
};

export const getSpendTrackingReport = async () => {
  const response = await api.get('/reports/spend-tracking');
  return response.data;
};
