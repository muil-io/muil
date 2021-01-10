import { queryCache, useMutation, useQuery } from 'react-query';
import * as api from 'shared/services/api';

const useProjects = () => {
  const { isLoading, data = [] } = useQuery('projects', api.fetchProjects);

  const [setProjectPlan] = useMutation(api.setProjectPlan, {
    onSuccess: () => queryCache.invalidateQueries('projects'),
  });

  return { isLoading, data, setProjectPlan };
};

export default useProjects;
