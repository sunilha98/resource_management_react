import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const allocateResource = async (allocationData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/allocations`, allocationData);
    return response.data;
  } catch (error) {
    console.error('Error allocating resource:', error);
    throw error;
  }
};

export default {
  allocateResource,
};
