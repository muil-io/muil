import { Injectable } from '@nestjs/common';
import renderTemplate from './renderTemplate';
import { RenderOptions } from './types';

@Injectable()
export class TemplatesRendererService {
  async render({
    type = 'html',
    templatePath,
    templateCssPath = null,
    props = {},
    shadowSupport = false,
    inlineCss = true,
    minifyHtml = true,
    pdfFormat = 'a4',
    pdfOrientation = 'portrait',
  }: RenderOptions): Promise<string | Buffer | void> {
    return renderTemplate({
      type,
      templatePath,
      templateCssPath,
      props,
      shadowSupport,
      inlineCss,
      minifyHtml,
      pdfFormat,
      pdfOrientation,
    });
  }
}
