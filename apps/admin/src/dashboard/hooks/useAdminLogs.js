import { useQuery } from 'react-query';
import * as api from 'shared/services/api';

const useAdminLogs = ({ selectedTimeRange }) => {
  const { isLoading, data = {} } = useQuery(
    [{ value: parseInt(selectedTimeRange, 10), unit: 'days' }, 'logs'],
    api.fetchLogs,
    { staleTime: 0 },
  );

  return { isLoading, data };
};

export default useAdminLogs;
