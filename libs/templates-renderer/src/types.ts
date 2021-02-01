import { PDFFormat } from 'puppeteer-core';

export type RenderOptions = {
  type?: 'html' | 'png' | 'pdf';
  sandbox?: boolean;
  templatePath: string;
  templateCssPath?: string;
  props?: any;
  styleCollectors?: any[];
  shadowSupport?: boolean;
  inlineCss?: boolean;
  minifyHtml?: boolean;
  pdfFormat?: PDFFormat;
  pdfOrientation?: 'portrait' | 'landscape';
};
