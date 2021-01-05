import React from 'react';
import Table from './Table';

const InfiniteTable = ({ items, fetchMore, canFetchMore, isFetchingMore, ...props }) => (
  <Table
    items={items}
    onRowsRendered={({ stopIndex }) =>
      !isFetchingMore && canFetchMore && stopIndex === items.length - 1 && fetchMore()
    }
    {...props}
  />
);

export default InfiniteTable;
