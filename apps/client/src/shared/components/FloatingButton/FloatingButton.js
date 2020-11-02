import React from 'react';
import styled from 'styled-components';
import media from 'style/media';
import { FlexCenter } from '../Flex';
import { card } from '../Card';

const Wrapper = styled(FlexCenter).attrs(() => ({ level: 2 }))`
	${card};
	background: ${({ theme }) => theme.colors.primary};
	width: 60px;
	height: 60px;
	border-radius: 100%;
	box-sizing: border-box;
	cursor: pointer;
	z-index: 1;
	transition: 200ms;

	position: fixed;
	bottom: 20px;
	right: 20px;

	font-size: 30px;
	color: ${({ theme }) => theme.colors.white};

	&:hover {
		background: ${({ theme }) => theme.colors.primaryDark};
	}

	${media.tablet`
		position: absolute;
		top: -13px;
		right: -13px;
	`}

	&:after {
		content: ${({ content }) => content};
	}
`;

const FloatingButton = ({ className, onClick, children = '+' }) => (
	<Wrapper className={className} onClick={onClick}>
		{children}
	</Wrapper>
);

export default FloatingButton;
