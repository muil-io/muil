import { useQuery } from 'react-query';
import * as api from 'shared/services/api';

const useAdminLogs = ({ selectedTimeRange }) => {
  const [value, unit] = selectedTimeRange.split('-');
  const { isLoading, data = {} } = useQuery([parseInt(value, 10), unit, 'logs'], api.fetchLogs, {
    staleTime: 0,
  });

  return { isLoading, data };
};

export default useAdminLogs;
