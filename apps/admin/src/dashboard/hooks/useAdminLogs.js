import { useMemo } from 'react';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import * as api from 'shared/services/api';
import usePersistedState from 'shared/hooks/usePersistedState';

const useAdminLogs = () => {
  const [selectedTimeRange, setSelectedTimeRange] = usePersistedState('timeRange', 7);
  const from = useMemo(() => dayjs().startOf('day').subtract(parseInt(selectedTimeRange), 'days'), [
    selectedTimeRange,
  ]);

  const { isLoading, data = [] } = useQuery([from, 'logs'], api.fetchLogs);

  return {
    isLoading,
    data,
    selectedTimeRange: parseInt(selectedTimeRange),
    setSelectedTimeRange,
  };
};

export default useAdminLogs;
