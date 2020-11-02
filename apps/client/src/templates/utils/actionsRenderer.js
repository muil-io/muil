import React from 'react';
import styled, { css } from 'styled-components';
import { FlexSpace } from 'shared/components';
import ViewIcon from 'shared/assets/icons/eye.svg';

const common = css`
	cursor: pointer;
	path {
		transition: 300ms;
	}

	&:hover {
		path {
			fill: ${({ theme }) => theme.colors.primary};
		}
	}
`;

const ViewButton = styled(ViewIcon)`
	${common};
`;

const actionsRenderer = ({ cellData: { onViewTemplate } }) => (
	<FlexSpace>
		<ViewButton onClick={onViewTemplate} />
	</FlexSpace>
);

export default actionsRenderer;
