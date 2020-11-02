import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 16px;
	flex: 1;
	cursor: pointer;
	border-bottom: 2px solid transparent;
	font-size: 14px;
	${({ theme, activeTab }) => activeTab && `font-weight: 500; color: ${theme.colors.primary};`};
`;

const Tab = ({ activeTab, onClick, children }) => (
	<Wrapper onClick={onClick} activeTab={activeTab}>
		{children}
	</Wrapper>
);

export default Tab;
