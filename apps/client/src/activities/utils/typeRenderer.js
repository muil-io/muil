import React from 'react';
import { FlexMiddle } from 'shared/components';
import { ACTIVITIES_MAP } from 'dashboard/constants';

const typeRenderer = ({ rowData: { type } }) => {
	const { singular } = ACTIVITIES_MAP[type];

	return <FlexMiddle>{singular}</FlexMiddle>;
};

export default typeRenderer;
