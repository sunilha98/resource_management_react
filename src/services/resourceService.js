
import api from './api';


const getBenchResources = async () => {
  try {
    const response = await api.get('/resources/bench');
    return response.data;
  } catch (error) {
    console.error('Error fetching bench resources:', error);
    throw error;
  }
};

export default {
  getBenchResources,
};
