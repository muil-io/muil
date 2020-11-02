import React from 'react';
import styled from 'styled-components';
import { FlexCenter, FlexMiddle } from '../Flex';
import { Header3 } from '../Typography';

const Check = styled(FlexCenter)`
	position: relative;
	width: 18px;
	height: 18px;
	border: 1px solid ${({ theme, isActive }) => (isActive ? theme.colors.primary : theme.colors.gray2)};
	border-radius: 4px;
	${({ theme, isActive }) => isActive && `background: ${theme.colors.primary}`};
	cursor: pointer;
	transition: 200ms;

	&:after {
		${({ isActive }) => isActive && 'content: ""'};
		display: block;
		position: absolute;
		top: 3px;
		left: 1px;
		width: 10px;
		height: 5px;
		border: solid 2px ${({ theme }) => theme.colors.white};
		border-right: none;
		border-top: none;
		transform: translate(2px, 1px) rotate(-45deg);
	}
`;

const Content = styled(Header3)`
	margin: 0 0 0 8px;

`;

const CheckBox = ({ className, value, onChange, content, children }) => (
	<FlexMiddle className={className}>
		<Check isActive={!!value} onClick={() => onChange(!value)} />
		<Content>{content || children}</Content>
	</FlexMiddle>
);

export default CheckBox;
