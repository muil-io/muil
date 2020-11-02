import { css } from 'styled-components';

const scrollbar = css`
	::-webkit-scrollbar {
		width: 4px;
		height: 6px;
	}

	::-webkit-scrollbar-track {
		background: transparent;
	}

	::-webkit-scrollbar-thumb {
		background: ${({ theme }) => theme.colors.gray1};
	}

	::-webkit-scrollbar-thumb:hover {
		background: ${({ theme }) => theme.colors.dark};
	}
`;

export default scrollbar;
