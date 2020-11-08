import * as puppeteer from 'puppeteer-core';

const pageSize = {
  A0: { height: '118.9cm', width: '84.1cm' },
  A1: { height: '84.1cm', width: '59.4cm' },
  A2: { height: '59.4cm', width: '42cm' },
  A3: { height: '42cm', width: '29.7cm' },
  A4: { height: '29.7cm', width: '21cm' },
  A5: { height: '21cm', width: '14.8cm' },
  A6: { height: '14.8cm', width: '10.5cm' },
  Tabloid: { height: '43.2cm', width: '27.9cm' },
  Letter: { height: '27.94cm', width: '21.59cm' },
  Legal: { height: '35.56cm', width: '21.59cm' },
  Ledger: { height: '43.18cm', width: '27.94cm' },
};

const getPage = async (html: string) => {
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.setContent(html);
  return page;
};

export const generatePdf = async (html: string, format: puppeteer.PDFFormat = 'A4') => {
  const page = await getPage(html);
  return page.pdf({
    format,
    height: pageSize[format].height || undefined,
    width: pageSize[format].width || undefined,
  });
};

export const generatePng = async (html: string) => {
  const page = await getPage(html);
  return page.screenshot({ fullPage: true });
};
