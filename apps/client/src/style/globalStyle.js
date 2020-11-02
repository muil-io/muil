import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

	html, body {
		margin:0;
	}

	body {
		background: #F6F5F8;
	}

	* {
		font-family: "Roboto","Helvetica Neue",sans-serif;
	}

	a {
		color: ${({ theme }) => theme.colors.primary};
	}

	h1, h2, h3{
		margin: 6px 0;
	}

	.rc-tooltip-inner {
		font-size: 14px;
    border-radius: 4px;
		max-width: 350px;
		word-break: break-word;
	}
`;

export default GlobalStyle;
