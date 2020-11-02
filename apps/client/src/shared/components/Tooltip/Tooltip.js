import React from 'react';
import RCTooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';

const Tooltip = ({ children, body, placement = 'left' }) => (
	<RCTooltip placement={placement} overlay={body}>
		{children}
	</RCTooltip>
);

export default Tooltip;
