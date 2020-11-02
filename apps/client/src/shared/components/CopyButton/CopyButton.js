import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import CopyIcon from 'shared/assets/icons/copy.svg';
import { shrinkAndTall } from 'style/animations';

const Wrapper = styled(({ isAnimate, ...props }) => <CopyIcon {...props} />)`
	cursor: pointer;
	&:hover {
		path {
			fill: ${({ theme }) => theme.colors.primary};
		}
	}

	${({ isAnimate }) =>
		isAnimate &&
		css`
			animation: ${shrinkAndTall} 500ms;
		`};
`;

const CopyButton = ({ className, copyText }) => {
	const [isAnimate, setIsAnimate] = useState(false);

	return (
		<Wrapper
			isAnimate={isAnimate}
			className={className}
			onAnimationEnd={() => setIsAnimate(false)}
			onClick={() => {
				navigator.clipboard.writeText(copyText);
				setIsAnimate(true);
			}}
		/>
	);
};

export default CopyButton;
