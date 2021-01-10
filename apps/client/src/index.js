import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactQueryConfigProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import { Helmet } from 'react-helmet';
import theme from './style/theme';
import GlobalStyle from './style/globalStyle';
import App from './app/components/App';

const REACT_QUERY_CONFIG = {
  queries: { staleTime: Infinity, refetchOnWindowFocus: false, retry: false },
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <ReactQueryConfigProvider config={REACT_QUERY_CONFIG}>
        <>
          <Helmet>
            <link
              href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
              rel="stylesheet"
            />
          </Helmet>
          <GlobalStyle />
          <App />
          <ReactQueryDevtools />
        </>
      </ReactQueryConfigProvider>
    </Router>
  </ThemeProvider>,
  document.getElementById('root'),
);
