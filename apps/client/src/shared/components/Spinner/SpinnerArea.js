import React from 'react';
import styled from 'styled-components';
import { FlexCenter } from '../Flex';
import Spinner from './Spinner';

const Wrapper = styled(FlexCenter)`
	flex-grow: 1;
`;

const BigSpinner = styled(Spinner)`
	.lds-ring,
	.lds-ring div {
		width: 80px;
		height: 80px;
		border-width: 5px;
	}
`;

const SpinnerArea = () => (
	<Wrapper>
		<BigSpinner />
	</Wrapper>
);

export default SpinnerArea;
