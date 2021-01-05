import { useMemo, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

const PER_PAGE = 50;

const useInfiniteTable = ({
  dataKey,
  apiFunc,
  defaultSortBy,
  defaultSortDirection,
  from,
  perPage = PER_PAGE,
}) => {
  const [sort, setSort] = useState({
    sortBy: defaultSortBy,
    sortDirection: defaultSortDirection,
  });

  const { isLoading, isFetchingMore, data, fetchMore, canFetchMore, refetch } = useInfiniteQuery(
    [dataKey, from, sort.sortBy, sort.sortDirection],
    (key, from, orderBy, orderByDirection, page = 0) =>
      apiFunc({ page, perPage, orderBy, orderByDirection: orderByDirection.toLowerCase(), from }),
    {
      staleTime: 0,
      cacheTime: 0,
      getFetchMore: (lastGroup, allGroups) => {
        const totalItems = allGroups.reduce((sum, { data }) => sum + data.length, 0);
        return totalItems === lastGroup.total ? false : Math.floor(totalItems / perPage);
      },
    },
  );

  const totalData = useMemo(() => (data || []).map(({ data }) => data).flat(), [data]);

  return {
    isLoading,
    isFetchingMore,
    data: totalData,
    fetchMore,
    canFetchMore,
    sort,
    handleSort: setSort,
    refetch,
  };
};

export default useInfiniteTable;
