import React, { useState, useMemo } from 'react';
import styled, { useTheme } from 'styled-components';
import { useParams } from 'react-router-dom';
import { Column } from 'react-virtualized';
import { Page, DropDown, InfiniteTable, FlexSpace, Header3, FlexMiddle } from 'shared/components';
import { dateRenderer } from 'shared/components/Table/cellRenderers';
import SpinnerArea from 'shared/components/Spinner/SpinnerArea';
import useLogs from 'shared/hooks/useLogs';
import { ACTIVITIES_MAP, TIME_RANGE_OPTIONS } from 'shared/constants';
import typeRenderer from '../utils/typeRenderer';
import infoRenderer from '../utils/infoRenderer';
import statusRenderer from '../utils/statusRenderer';
import detailsRenderer from '../utils/detailsRenderer';

const Row = styled(FlexSpace)`
  flex: 1;
`;

const Prefix = styled(Header3)`
  height: 15px;
  margin-right: 8px;
`;

const FilterDropDown = styled(DropDown)`
  height: 27px;
`;

const TimeRangeDropDown = styled(DropDown).attrs(() => ({ location: { right: 0 } }))``;

const Activities = () => {
  const theme = useTheme();
  const { filter } = useParams();
  const {
    isLoading,
    isFetchingMore,
    data = [],
    selectedTimeRange,
    setSelectedTimeRange,
    fetchMore,
    canFetchMore,
    sort,
    handleSort,
  } = useLogs();
  const [selectedFilter, setSelectedFilter] = useState(filter || 'all');

  const filters = useMemo(
    () => [
      { label: 'All', value: 'all' },
      ...Object.entries(ACTIVITIES_MAP).map(([key, { shortTitle }]) => ({
        value: key,
        label: shortTitle,
      })),
    ],
    [],
  );

  const filteredData = useMemo(
    () =>
      data.filter(
        ({ type, status }) =>
          selectedFilter === 'all' || selectedFilter === type || selectedFilter === status,
      ),
    [data, selectedFilter],
  );

  if (isLoading) {
    return <SpinnerArea />;
  }

  return (
    <Page
      title="Activities"
      renderRight={() => (
        <Row>
          <FlexMiddle>
            <Prefix>Type: </Prefix>
            <FilterDropDown
              placeHolder="Select..."
              selectedValue={selectedFilter}
              options={filters}
              onChange={({ value }) => setSelectedFilter(value)}
            />
          </FlexMiddle>

          <TimeRangeDropDown
            selectedValue={selectedTimeRange}
            onChange={({ value }) => setSelectedTimeRange(value)}
            options={TIME_RANGE_OPTIONS}
          />
        </Row>
      )}
    >
      <InfiniteTable
        items={filteredData}
        isFetchingMore={isFetchingMore}
        fetchMore={fetchMore}
        canFetchMore={canFetchMore}
        sortBy={sort.sortBy}
        sortDirection={sort.sortDirection}
        sort={handleSort}
        rowHeight={({ rowData: { type, status } }) =>
          type !== 'email' ? 48 : status === 'error' ? 80 : 60
        }
        noDataTitle="No Activities Found"
        noDataSubTitle={
          <>
            Visit our{' '}
            <a
              href="https://docs.muil.io/docs/api/authorization/"
              target="_blank"
              rel="noopener noreferrer"
            >
              documentation
            </a>{' '}
            to see how to generate template
          </>
        }
      >
        <Column label="" dataKey="status" width={10} cellRenderer={statusRenderer} />
        <Column
          label="Date"
          dataKey="datetime"
          width={170}
          cellRenderer={dateRenderer}
          columnType="date"
        />
        <Column
          label="Type"
          dataKey="type"
          width={70}
          cellRenderer={typeRenderer}
          cellDataGetter={() => ({ theme })}
          showOnSize="mobile"
        />
        <Column
          label="Template"
          dataKey="templateId"
          flexGrow={1}
          width={1}
          showOnSize="mobile"
          cellRenderer={({ rowData }) => rowData?.displayName}
        />
        <Column label="Branch" dataKey="branch" flexGrow={1} width={1} showOnSize="tablet" />
        <Column
          label="Details"
          dataKey="details"
          flexGrow={3}
          width={1}
          cellRenderer={detailsRenderer}
          showOnSize="tablet"
          disableSort
        />
        <Column label="" dataKey="to" width={30} cellRenderer={infoRenderer} />
      </InfiniteTable>
    </Page>
  );
};

export default Activities;
