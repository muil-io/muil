import * as fs from 'fs';
import puppeteer, { SupportedBrowser, PaperFormat } from 'puppeteer-core';

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

let executablePath = '/usr/bin/chromium-browser';
let browserType: SupportedBrowser = 'chrome' as SupportedBrowser;
if (process.platform === 'win32') {
  if (fs.existsSync('C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe')) {
    executablePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
  } else if (fs.existsSync('C:\\Program Files\\Mozilla Firefox\\firefox.exe')) {
    browserType = 'firefox' as SupportedBrowser;
    executablePath = 'C:\\Program Files\\Mozilla Firefox\\firefox.exe';
  }
} else if (process.platform === 'darwin') {
  if (fs.existsSync('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')) {
    executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  } else if (fs.existsSync('/Applications/Firefox.app/Contents/MacOS/firefox')) {
    browserType = 'firefox' as SupportedBrowser;
    executablePath = '/Applications/Firefox.app/Contents/MacOS/firefox';
  }
}

export const generatePdf = async (
  html: string,
  format: PaperFormat = 'a4',
  orientation: 'portrait' | 'landscape' = 'portrait',
) => {
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || executablePath,
    browser: browserType,
    args: browserType === 'chrome' ? ['--no-sandbox', '--disable-setuid-sandbox'] : undefined,
  });
  const page = await browser.newPage();

  await page.setContent(html);

  const pdf = await page.pdf({
    format,
    landscape: orientation === 'landscape',
    height: pageSize[format].height || undefined,
    width: pageSize[format].width || undefined,
  });

  await page.close();
  await browser.close();

  return Buffer.from(pdf);
};

export const generatePng = async (html: string) => {
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || executablePath,
    browser: browserType,
    args: browserType === 'chrome' ? ['--no-sandbox', '--disable-setuid-sandbox'] : undefined,
  });
  const page = await browser.newPage();

  await page.setContent(html);

  const screenshot = await page.screenshot({ fullPage: true });

  await page.close();
  await browser.close();

  return Buffer.from(screenshot);
};
