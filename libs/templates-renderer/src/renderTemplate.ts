import juice from 'juice';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { minify } from 'html-minifier';
import requireFromString from 'require-from-string';
import emailTemplate from './emailTemplate';
import { styledComponentsStyleCollector } from './styleCollectors';

type Options = {
  template: string;
  templateCss?: string;
  props?: string;
  styleCollectors?: any[];
  shadowSupport?: boolean;
  inlineCss?: boolean;
  minifyHtml?: boolean;
};

const renderTemplate = async ({
  template,
  templateCss = null,
  props = '{}',
  styleCollectors = [styledComponentsStyleCollector],
  shadowSupport = false,
  inlineCss = true,
  minifyHtml = true,
}: Options) => {
  if (!template) return '';

  try {
    const ReactComponent = await requireFromString(template);
    const ReactElement = React.createElement(ReactComponent.default, JSON.parse(props));

    let html = emailTemplate({
      css: templateCss,
      styles: (await Promise.all(styleCollectors.map((collector) => collector(ReactElement)))).join(
        '\n',
      ),
      content: renderToStaticMarkup(ReactElement),
      shadowSupport,
    });

    if (inlineCss) {
      html = juice(html);
    }

    if (minifyHtml) {
      html = minify(html, {
        preventAttributesEscaping: true,
        minifyCSS: true,
        minifyURLs: true,
        removeEmptyAttributes: true,
        removeComments: true,
      });
    }

    return html;
  } catch (err) {
    return {
      error: {
        message: err.toString(),
      },
    };
  }
};

export default renderTemplate;
