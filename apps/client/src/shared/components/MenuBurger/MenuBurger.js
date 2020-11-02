import React from 'react';
import styled from 'styled-components';
import { FlexColumn } from '../Flex';

const Wrapper = styled(FlexColumn)`
	justify-content: space-between;
	width: 18px;
	height: 14px;
	cursor: pointer;

	> span {
		height: 2px;
		display: block;
		background: ${({ theme }) => theme.colors.gray1};
	}
`;

const MenuBurger = ({ className, onClick }) => (
	<Wrapper className={className} onClick={onClick}>
		<span />
		<span />
		<span />
	</Wrapper>
);

export default MenuBurger;
