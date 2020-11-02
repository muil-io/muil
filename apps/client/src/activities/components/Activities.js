import React, { useState, useMemo } from 'react';
import styled, { useTheme } from 'styled-components';
import { useParams } from 'react-router-dom';
import { Column } from 'react-virtualized';
import { Page, DropDown, Table, FlexSpace } from 'shared/components';
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

const FilterDropDown = styled(DropDown)`
  height: 27px;
`;

const TimeRangeDropDown = styled(DropDown).attrs(() => ({ location: { right: 0 } }))``;

const Activities = () => {
  const theme = useTheme();
  const { filter } = useParams();
  const { isLoading, data = [], selectedTimeRange, setSelectedTimeRange } = useLogs();
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
          <FilterDropDown
            placeHolder="Select..."
            selectedValue={selectedFilter}
            options={filters}
            onChange={({ value }) => setSelectedFilter(value)}
          />

          <TimeRangeDropDown
            selectedValue={selectedTimeRange}
            onChange={({ value }) => setSelectedTimeRange(value)}
            options={TIME_RANGE_OPTIONS}
          />
        </Row>
      )}
    >
      <Table
        items={filteredData}
        rowHeight={({ rowData: { type, status } }) =>
          type !== 'email' ? 48 : status === 'error' ? 80 : 60
        }
        defaultSortBy="date"
        defaultSortDirection="DESC"
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
          dataKey="date"
          flexGrow={1.5}
          width={1}
          maxWidth={170}
          cellRenderer={dateRenderer}
          columnType="date"
        />
        <Column
          label="Type"
          dataKey="type"
          flexGrow={1}
          width={1}
          cellRenderer={typeRenderer}
          cellDataGetter={() => ({ theme })}
          maxWidth={150}
          showOnSize="mobile"
        />
        <Column
          label="Template"
          dataKey="displayName"
          flexGrow={1.5}
          width={1}
          showOnSize="mobile"
        />
        <Column label="Branch" dataKey="branch" flexGrow={1} width={1} showOnSize="tablet" />
        <Column
          label="Details"
          dataKey="details"
          flexGrow={1}
          width={1}
          cellRenderer={detailsRenderer}
          showOnSize="tablet"
        />
        <Column label="" dataKey="to" width={30} cellRenderer={infoRenderer} />
      </Table>
    </Page>
  );
};

export default Activities;
