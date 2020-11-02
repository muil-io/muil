import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Header1, FlexCenter } from 'shared/components';
import BaseCard from './BaseCard';

const Wrapper = styled(BaseCard)`
	align-items: center;
	cursor: pointer;

	&:hover {
		box-shadow: 0 4px 28px rgba(208, 89, 255, 0.2), 0 0px 10px rgba(208, 89, 255, 0.2);
	}
`;

const Count = styled(Header1)`
	color: ${({ theme }) => theme.colors.dark};
`;

const Icon = styled(FlexCenter)`
	padding: 20px;
	margin: 20px 0 10px;
	border-radius: 100%;
	background: ${({ color }) => color};
`;

const Counter = ({ className, title, count = 0, renderIcon, color, navigate }) => {
	const { push } = useHistory();
	return (
		<Wrapper className={className} title={title} titleColor={color} onClick={() => push(navigate)}>
			<Count>{count.toLocaleString()}</Count>
			<Icon color={color}>{renderIcon?.()}</Icon>
		</Wrapper>
	);
};

export default Counter;
