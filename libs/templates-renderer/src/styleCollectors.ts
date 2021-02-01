import { ServerStyleSheet } from 'styled-components';
import { ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { NodeVM } from 'vm2';

export const styledComponentsStyleCollector = (ReactElement: ReactNode, { sandbox = true }) => {
  if (!sandbox) {
    const sheet = new ServerStyleSheet();
    renderToStaticMarkup(sheet.collectStyles(ReactElement));
    return sheet.getStyleTags();
  }

  const vm = new NodeVM({
    timeout: 5000,
    sandbox: {
      ReactElement,
    },
    require: {
      external: ['react', 'react-dom/server', 'styled-components'],
    },
  });

  const styleTags = vm.run(
    `
      const { renderToStaticMarkup } = require('react-dom/server');
      const { ServerStyleSheet } = require('styled-components');

      const sheet = new ServerStyleSheet();
      renderToStaticMarkup(sheet.collectStyles(ReactElement));
      module.exports = sheet.getStyleTags();
    `,
    'styleCollectors.js',
  );

  return styleTags;
};
