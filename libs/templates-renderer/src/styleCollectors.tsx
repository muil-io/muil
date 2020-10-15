import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export const styledComponentsStyleCollector = (
  ReactElement: React.CElement<any, React.Component<any, any, any>>,
) => {
  const sheet = new ServerStyleSheet();
  renderToStaticMarkup(
    <StyleSheetManager sheet={sheet.instance} disableVendorPrefixes>
      {ReactElement}
    </StyleSheetManager>,
  );
  return sheet.getStyleTags();
};
