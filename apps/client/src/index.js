import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const render = (AppComponent) => {
  ReactDOM.render(<AppComponent />, document.getElementById('root'));
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => render(require('./App'))); // eslint-disable-line global-require
}
