import * as puppeteer from 'puppeteer-core';

const getPage = async (html: string) => {
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.setContent(html);
  return page;
};

export const generatePdf = async (html: string) => {
  const page = await getPage(html);
  return page.pdf({ format: 'Letter' });
};

export const generatePng = async (html: string) => {
  const page = await getPage(html);
  return page.screenshot({ fullPage: true });
};
