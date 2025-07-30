import { useEffect, useState } from 'react';
import resourceService from '../services/resourceService';

const useBenchResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await resourceService.getBenchResources();
        setResources(data);
      } catch (error) {
        console.error('Failed to load bench resources');
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  return { resources, loading };
};

export default useBenchResources;
