import React from 'react';
import styled from 'styled-components';
import { Tooltip } from 'shared/components';
import BaseInfoIcon from 'shared/assets/icons/info.svg';

const InfoIcon = styled(BaseInfoIcon)`
	width: 18px;
	height: 18px;
	margin-left: 10px;

	path {
		fill: ${({ theme }) => theme.colors.gray1};
	}
`;

const infoRenderer = ({ rowData: { type, from, to, cc, bcc, error, subject } }) => {
	if (type !== 'email') {
		return null;
	}

	return (
		<Tooltip
			body={
				<div>
					<div>
						<strong>subject: </strong>
						{subject}
					</div>
					<div>
						<strong>from: </strong>
						{from}
					</div>
					<div>
						<strong>to: </strong>
						{to}
					</div>
					{cc && (
						<div>
							<strong>cc: </strong>
							{cc}
						</div>
					)}
					{bcc && (
						<div>
							<strong>bcc: </strong>
							{bcc}
						</div>
					)}
					{error && (
						<div>
							<strong>error: </strong>
							{error}
						</div>
					)}
				</div>
			}
		>
			<InfoIcon />
		</Tooltip>
	);
};

export default infoRenderer;
