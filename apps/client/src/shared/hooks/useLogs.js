import { useMemo } from 'react';
import dayjs from 'dayjs';
import * as api from '../services/api';
import usePersistedState from './usePersistedState';
import useProjects from './useProjects';
import useTemplates from './useTemplates';
import { ACTIVITIES_MAP } from '../constants';
import useInfiniteTable from './useInfiniteTable';

const useLogs = ({ perPage } = {}) => {
  const [selectedTimeRange, setSelectedTimeRange] = usePersistedState('timeRange', 7);
  const from = useMemo(() => dayjs().startOf('day').subtract(parseInt(selectedTimeRange), 'days'), [
    selectedTimeRange,
  ]);

  const { project } = useProjects();
  const { isLoading: templatesLoading, data: templatesData = [] } = useTemplates();

  const {
    isLoading,
    isFetchingMore,
    data,
    fetchMore,
    canFetchMore,
    sort,
    handleSort,
  } = useInfiniteTable({
    dataKey: 'activities',
    apiFunc: api.fetchActivities,
    defaultSortBy: 'datetime',
    defaultSortDirection: 'DESC',
    from,
    enabled: project,
    perPage,
  });

  const templatesMap = useMemo(
    () =>
      templatesData.reduce(
        (prev, { branch, templateId, displayName }) => ({
          ...prev,
          [`${branch}-${templateId}`]: displayName,
        }),
        {},
      ),
    [templatesData],
  );

  const formattedData = useMemo(
    () =>
      data
        .filter(({ type }) => ACTIVITIES_MAP[type])
        .map((activity) => ({
          ...activity,
          displayName:
            templatesMap[`${activity.branch}-${activity.templateId}`] || activity.templateId,
        })),
    [data, templatesMap],
  );

  return {
    isLoading: isLoading || templatesLoading,
    isFetchingMore,
    data: formattedData,
    selectedTimeRange: parseInt(selectedTimeRange),
    setSelectedTimeRange,
    fetchMore,
    canFetchMore,
    sort,
    handleSort,
  };
};

export default useLogs;
