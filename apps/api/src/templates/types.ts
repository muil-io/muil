import { PDFFormat } from 'puppeteer-core';

export type File = {
  originalname: string;
  buffer: Buffer | string;
};

export type RenderOptions = {
  type?: 'html' | 'png' | 'pdf';
  inlineCss: boolean;
  minifyHtml: boolean;
  pdfFormat?: PDFFormat;
  pdfOrientation?: 'portrait' | 'landscape';
  writeLog?: boolean;
};
