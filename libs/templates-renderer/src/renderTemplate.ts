import * as fs from 'fs';
import { NodeVM } from 'vm2';
import * as juice from 'juice';
import { minify } from 'html-minifier';
import emailTemplate from './emailTemplate';
import { styledComponentsStyleCollector } from './styleCollectors';
import { generatePdf, generatePng } from './puppeteer';
import { RenderOptions } from './types';

const renderTemplate = async ({
  type = 'html',
  templatePath,
  templateCssPath = null,
  props = {},
  styleCollectors = [styledComponentsStyleCollector],
  shadowSupport = false,
  inlineCss = true,
  minifyHtml = true,
}: RenderOptions): Promise<string | Buffer> => {
  if (!templatePath) return '';

  const reactElementVm = new NodeVM({
    timeout: 5000,
    sandbox: {
      props,
    },
    require: {
      external: ['react', 'react-dom/server'],
    },
  });

  const ReactElement = reactElementVm.run(
    `
        const {createElement} = require('react');
        const ReactComponent = require('${templatePath}');
        const ReactElement = createElement(ReactComponent.default, props);
        module.exports = ReactElement;
      `,
    'renderTemplate.js',
  );

  const contentVm = new NodeVM({
    timeout: 5000,
    sandbox: {
      ReactElement,
    },
    require: {
      external: ['react-dom/server'],
    },
  });

  const content = contentVm.run(
    `
        const { renderToStaticMarkup } = require('react-dom/server');

        const content = renderToStaticMarkup(ReactElement);
        module.exports = content;
      `,
    'renderTemplate.js',
  );

  const templateCss = templateCssPath ? fs.readFileSync(templateCssPath, 'utf-8') : null;

  let html = emailTemplate({
    css: templateCss,
    styles: (await Promise.all(styleCollectors.map((collector) => collector(ReactElement)))).join(
      '\n',
    ),
    content,
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

  switch (type) {
    case 'png': {
      return generatePng(html);
    }
    case 'pdf': {
      return generatePdf(html);
    }
    default: {
      return html;
    }
  }
};

export default renderTemplate;
