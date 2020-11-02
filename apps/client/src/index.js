import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import App from './App';

Sentry.init({ dsn: 'https://3d5a1c963f674359804c040f1933e1d6@o395629.ingest.sentry.io/5247876' });

const render = (AppComponent) => {
	ReactDOM.render(<AppComponent />, document.getElementById('root'));
};

render(App);

if (module.hot) {
	module.hot.accept('./App', () => render(require('./App'))); // eslint-disable-line global-require
}
