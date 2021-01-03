import { useQuery } from 'react-query';
import * as api from 'shared/services/api';

const useProjects = () => {
  const { isLoading, data = {} } = useQuery('projects', api.fetchProjects);

  return { isLoading, data };
};

export default useProjects;
