import { ReactNode } from 'react';
import { ServerStyleSheet } from 'styled-components';
import { renderToStaticMarkup } from 'react-dom/server';

export const styledComponentsStyleCollector = (ReactElement: ReactNode) => {
  const sheet = new ServerStyleSheet();
  renderToStaticMarkup(sheet.collectStyles(ReactElement));
  return sheet.getStyleTags();
};
