import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	position: relative;
	background: ${({ theme, isActive }) => (isActive ? theme.colors.primary : theme.colors.gray2)};
	border-radius: 32px;
	width: 64px;
	height: 32px;
	cursor: pointer;

	&:after {
		content: '';
		position: absolute;
		background: ${({ theme }) => theme.colors.white};
		border-radius: 100%;
		width: 28px;
		height: 28px;
		margin: 2px;
		transition: 200ms;
		${({ isActive }) => (isActive ? 'right: 0' : 'left: 0;')}
	}
`;

const Toggle = ({ isActive, onChange }) => <Wrapper isActive={isActive} onClick={() => onChange(!isActive)} />;

export default Toggle;
