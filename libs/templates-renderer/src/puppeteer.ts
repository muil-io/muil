import chrome from '@sparticuz/chromium';
import * as puppeteer from 'puppeteer-core';

const pageSize = {
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

const getBrowser = async () => {
  const isProd = process.env.NODE_ENV === 'production';
  let browser: puppeteer.Browser;
  if (isProd) {
    browser = await puppeteer.launch({
      args: chrome.args,
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath(),
      ignoreHTTPSErrors: true,
    });
  } else {
    browser = await puppeteer.launch({
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    });
  }

  return browser;
};

export const generatePdf = async (
  html: string,
  format: puppeteer.PaperFormat = 'a4',
  orientation: 'portrait' | 'landscape' = 'portrait',
) => {
  const browser = await getBrowser();

  try {
    const page = await browser.newPage();
    await page.setContent(html);

    const pdf = await page.pdf({
      format,
      landscape: orientation === 'landscape',
      height: pageSize[format].height || undefined,
      width: pageSize[format].width || undefined,
    });

    return pdf;
  } finally {
    await browser.close();
  }
};

export const generatePng = async (html: string) => {
  const browser = await getBrowser();

  try {
    const page = await browser.newPage();
    await page.setContent(html);

    const screenshot = await page.screenshot({ fullPage: true });

    await browser.close();

    return screenshot;
  } finally {
    await browser.close();
  }
};
