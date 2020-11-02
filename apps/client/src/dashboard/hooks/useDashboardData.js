import { useMemo } from 'react';
import { groupBy } from 'shared/utils/data';

const useDashboardData = ({ data }) => {
  const formattedData = useMemo(
    () => data.map((activity) => (activity.error ? { ...activity, type: 'error' } : activity)),
    [data],
  );

  const groups = useMemo(() => groupBy(formattedData, 'type'), [formattedData]);

  const topTemplates = useMemo(() => {
    const templatesBranch = formattedData.map((activity) => ({
      ...activity,
      tb: `${activity.displayName}-${activity.branch}`,
    }));

    const groups = groupBy(templatesBranch, 'tb');

    const templates = Object.entries(groups).map(([key, list]) => ({
      displayName: key.split('-')[0],
      branch: key.split('-')[1],
      value: list.length,
    }));

    return templates.sort((a, b) => b.value - a.value);
  }, [formattedData]);

  const lastErrors = useMemo(
    () =>
      formattedData
        .filter(({ type }) => type === 'error')
        .sort((a, b) => new Date(b.datetime) - new Date(a.datetime)),
    [formattedData],
  );

  return {
    groups,
    formattedData,
    topTemplates,
    lastErrors,
  };
};

export default useDashboardData;
