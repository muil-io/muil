import { css } from 'styled-components';

export const defaultMediaBreakpoints = {
	mobile: '400px',
	tablet: '680px',
	desktop: '1270px',
	mediumDesktop: '1430px',
	wideDesktop: '1670px',
	largeDesktop: '1910px',
};

const media = Object.keys(defaultMediaBreakpoints).reduce((memo, val) => {
	memo[val] = (...args) => css`
		@media (min-width: ${defaultMediaBreakpoints[val]}) {
			${css(...args)};
		}
	`;
	return memo;
}, {});

export default media;
