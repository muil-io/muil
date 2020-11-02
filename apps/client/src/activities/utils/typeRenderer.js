import React from 'react';
import { FlexMiddle } from 'shared/components';
import { ACTIVITIES_MAP } from 'shared/constants';

const typeRenderer = ({ rowData: { type } }) => {
  const { singular } = ACTIVITIES_MAP[type];

  return <FlexMiddle>{singular}</FlexMiddle>;
};

export default typeRenderer;
