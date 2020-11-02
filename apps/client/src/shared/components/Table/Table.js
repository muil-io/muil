import React, { useState, useMemo, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { Table as BaseTable, WindowScroller, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css';
import { FlexColumn, FlexColumnCenter } from '../Flex';
import { card } from '../Card';
import { Header2, Header3 } from '../Typography';
import media from '../../../style/media';

const SORT_MAP = {
  string: (a = '', b = '') => a.localeCompare(b),
  date: (a, b) => new Date(a) - new Date(b),
  number: (a, b) => a - b,
};

const Wrapper = styled(FlexColumn).attrs(() => ({ level: 3 }))`
  ${card};
`;

const EmptyStateWrapper = styled(FlexColumnCenter)`
  min-height: 200px;
  text-align: center;
  width: 77%;
  margin: 0 auto;
`;

const StyledTable = styled(BaseTable)`
  .ReactVirtualized__Grid {
    outline: none;
  }

  .ReactVirtualized__Table__headerRow {
    font-size: 14px;
  }

  .ReactVirtualized__Table__row {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};
    font-size: 14px;
  }

  .ReactVirtualized__Table__headerColumn,
  .ReactVirtualized__Table__rowColumn {
    display: none;
    ${({ columnsShowSizes }) =>
      columnsShowSizes.map((size, index) =>
        size
          ? css`
              ${media[size]`&:nth-child(${index + 1}){display: block;}`}
            `
          : `&:nth-child(${index + 1}){display: block;}`,
      )}
  }
`;

const Table = ({
  items,
  defaultSortBy,
  defaultSortDirection,
  children,
  noDataTitle,
  noDataSubTitle,
  rowHeight,
  ...tableProps
}) => {
  const columns = useMemo(() => React.Children.toArray(children).map(({ props }) => props), [
    children,
  ]);
  const columnsShowSizes = columns.map(({ showOnSize }) => showOnSize || '');
  const [_sortBy, setSortBy] = useState(defaultSortBy);
  const [_sortDirection, setSortDirection] = useState(defaultSortDirection || 'ASC');

  const handleSort = useCallback(({ sortBy, sortDirection }) => {
    setSortBy(sortBy);
    setSortDirection(sortDirection);
  }, []);

  const sortedList = useMemo(() => {
    const { columnType = 'string' } = columns.find(({ dataKey }) => dataKey === _sortBy);

    const sorted = items.sort((a, b) => SORT_MAP[columnType](a[_sortBy], b[_sortBy]));
    return _sortDirection === 'ASC' ? sorted : sorted.reverse();
  }, [_sortBy, _sortDirection, columns, items]);

  if (sortedList.length === 0) {
    return (
      <EmptyStateWrapper>
        <Header2>{noDataTitle}</Header2>
        <Header3>{noDataSubTitle}</Header3>
      </EmptyStateWrapper>
    );
  }

  return (
    <Wrapper>
      <WindowScroller>
        {({ height, isScrolling, onChildScroll, scrollTop }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <StyledTable
                rowCount={sortedList.length}
                rowGetter={({ index }) => sortedList[index]}
                sortBy={_sortBy}
                sortDirection={_sortDirection}
                sort={handleSort}
                columnsShowSizes={columnsShowSizes}
                headerHeight={50}
                rowHeight={({ index }) => rowHeight?.({ index, rowData: sortedList[index] }) || 48}
                width={width}
                height={height}
                autoHeight
                isScrolling={isScrolling}
                onScroll={onChildScroll}
                scrollTop={scrollTop}
                {...tableProps}
              >
                {children}
              </StyledTable>
            )}
          </AutoSizer>
        )}
      </WindowScroller>
    </Wrapper>
  );
};

export default Table;
