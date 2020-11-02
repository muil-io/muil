import React, { Children, cloneElement, useMemo } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	position: relative;
	border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};

	&:after {
		content: '';
		height: 2px;
		width: calc(100% / ${({ count }) => count});
		background: ${({ theme }) => theme.colors.primary};
		position: absolute;
		bottom: 0;
		left: ${({ count, selectedIndex }) => `calc(100% / ${count} * ${selectedIndex})`};
		transition: 200ms;
	}
`;

const Tabs = ({ activeTab, onTabChange, children }) => {
	const count = useMemo(() => React.Children.count(children), [children]);
	const selectedIndex = useMemo(() => children.findIndex(({ props: { name } }) => name === activeTab), [
		children,
		activeTab,
	]);

	return (
		<Wrapper count={count} selectedIndex={selectedIndex}>
			{Children.map(children, (child) =>
				cloneElement(child, {
					activeTab: activeTab === child.props.name,
					onClick: () => onTabChange(child.props.name),
				}),
			)}
		</Wrapper>
	);
};

export default Tabs;
