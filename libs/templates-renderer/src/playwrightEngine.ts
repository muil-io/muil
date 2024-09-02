import { chromium, Page } from 'playwright';
import { PageFormat } from './types';

const pageSize: Record<PageFormat, { height: string; width: string }> = {
  a0: { height: '118.9cm', width: '84.1cm' },
  a1: { height: '84.1cm', width: '59.4cm' },
  a2: { height: '59.4cm', width: '42cm' },
  a3: { height: '42cm', width: '29.7cm' },
  a4: { height: '29.7cm', width: '21cm' },
  a5: { height: '21cm', width: '14.8cm' },
  a6: { height: '14.8cm', width: '10.5cm' },
  tabloid: { height: '43.2cm', width: '27.9cm' },
  letter: { height: '27.94cm', width: '21.59cm' },
  legal: { height: '35.56cm', width: '21.59cm' },
  ledger: { height: '43.18cm', width: '27.94cm' },
};

export const generatePdf = async (
  html: string,
  format: PageFormat = 'a4',
  orientation: 'portrait' | 'landscape' = 'portrait',
) => {
  const browser = await chromium.launch();
  const page: Page = await browser.newPage();

  let pdf: Buffer;
  try {
    await page.setContent(html);

    pdf = await page.pdf({
      format,
      landscape: orientation === 'landscape',
      height: pageSize[format].height || undefined,
      width: pageSize[format].width || undefined,
    });
  } finally {
    await browser.close();
  }

  return pdf;
};

export const generatePng = async (html: string) => {
  const browser = await chromium.launch();
  const page: Page = await browser.newPage();

  let screenshot: Buffer;
  try {
    await page.setContent(html);

    screenshot = await page.screenshot({ fullPage: true });
  } finally {
    await browser.close();
  }

  return screenshot;
};
