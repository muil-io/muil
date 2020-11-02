import React from 'react';
import styled from 'styled-components';
import { Card, flexColumn, Header4SemiBold } from 'shared/components';

const Wrapper = styled(Card).attrs(() => ({ level: 3 }))`
	${flexColumn};
	flex: 1;
	margin: 10px 10px 20px;
	min-width: 160px;
	background: ${({ theme }) => theme.colors.white};
	padding: 20px;
	flex: 1;
	border-radius: 4px;
`;

const Title = styled(Header4SemiBold)`
	color: ${({ theme, color }) => color || theme.colors.gray1};
	width: 100%;
	margin: 0;
	margin-bottom: 20px;
	text-align: left;
`;

const BaseCard = ({ className, title, titleColor, children, onClick }) => (
	<Wrapper className={className} onClick={() => onClick?.()}>
		<Title color={titleColor}>{title}</Title>
		{children}
	</Wrapper>
);

export default BaseCard;
