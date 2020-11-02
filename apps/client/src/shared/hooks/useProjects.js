import { useQuery } from 'react-query';
import * as api from '../services/api';

const useProjects = () => {
  const storeKey = 'projects';
  const { isLoading, data } = useQuery(storeKey, api.fetchProjects);

  return { isLoading, project: data };
};

export default useProjects;
