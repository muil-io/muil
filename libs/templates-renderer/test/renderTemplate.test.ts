import * as fs from 'fs';
import * as path from 'path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import renderTemplate from '../src/renderTemplate';

const BUILD_DIR = path.join(__dirname, 'fixtures');
const OUTPUT_DIR = path.join(__dirname, 'output');

beforeAll(async () => {
  await fs.promises.mkdir(OUTPUT_DIR, { recursive: true });
});

const loadTemplate = (name: string) => {
  const templatePath = path.join(BUILD_DIR, `${name}.js`);
  const cssPath = path.join(BUILD_DIR, `${name}.css`);
  const meta = JSON.parse(fs.readFileSync(path.join(BUILD_DIR, `${name}.json`), 'utf-8'));
  return {
    templatePath,
    templateCssPath: fs.existsSync(cssPath) ? cssPath : undefined,
    props: meta.dynamicProps,
  };
};

afterAll(async () => {
  await fs.promises.rm('./.muil', { recursive: true, force: true });
});

describe('renderTemplate', () => {
  it('returns empty string when templatePath is missing', async () => {
    expect(await renderTemplate({ templatePath: undefined as any })).toBe('');
  });

  describe('simple template (external CSS)', () => {
    const { templatePath, templateCssPath, props } = loadTemplate('simple');

    it('renders HTML with dynamic props and inlines external CSS', async () => {
      const html = (await renderTemplate({ templatePath, templateCssPath, props })) as string;

      expect(html).toContain('Hi John,');
      expect(html).toContain('Call to Action');
      expect(html).toContain('https://www.muil.io');
      expect(html).toMatch(/<a[^>]*style="[^"]*background:\s*(#009ad7|rgb\(0,\s*154,\s*215\))/i);
    });

    it('keeps CSS in <style> when inlineCss=false', async () => {
      const html = (await renderTemplate({
        templatePath,
        templateCssPath,
        props,
        inlineCss: false,
        minifyHtml: false,
      })) as string;

      expect(html).toMatch(/<style[^>]*>[\s\S]*\.button\s*{[\s\S]*#009ad7/i);
      expect(html).not.toMatch(/<a[^>]*style="[^"]*#009ad7/i);
    });

    it('generates a real PDF via puppeteer-core', async () => {
      const pdf = (await renderTemplate({
        templatePath,
        templateCssPath,
        props,
        type: 'pdf',
      })) as Buffer;

      expect(Buffer.isBuffer(pdf)).toBe(true);
      expect(pdf.subarray(0, 5).toString()).toBe('%PDF-');
      expect(pdf.length).toBeGreaterThan(1000);
      await fs.promises.writeFile(path.join(OUTPUT_DIR, 'simple.pdf'), pdf);
    });

    it('generates a real PNG via puppeteer-core', async () => {
      const png = (await renderTemplate({
        templatePath,
        templateCssPath,
        props,
        type: 'png',
      })) as Buffer;

      expect(Buffer.isBuffer(png)).toBe(true);
      expect(png[0]).toBe(0x89);
      expect(png.subarray(1, 4).toString()).toBe('PNG');
      expect(png.length).toBeGreaterThan(1000);
      await fs.promises.writeFile(path.join(OUTPUT_DIR, 'simple.png'), png);
    });
  });

  describe('styled template (styled-components)', () => {
    const { templatePath, props } = loadTemplate('styled');

    it('collects styled-components CSS and inlines it onto elements', async () => {
      const html = (await renderTemplate({ templatePath, props })) as string;

      expect(html).toContain('Hi Jane');
      expect(html).toContain('Learn more');
      expect(html).toContain('https://styled-components.com');
      expect(html).toMatch(/<div[^>]*style="[^"]*background:\s*(white|#fff|#ffffff)/i);
      expect(html).toMatch(/<a[^>]*style="[^"]*color:\s*(#764ba2|rgb\(118,\s*75,\s*162\))/i);
    });

    it('generates a real PDF via puppeteer-core', async () => {
      const pdf = (await renderTemplate({ templatePath, props, type: 'pdf' })) as Buffer;
      expect(pdf.subarray(0, 5).toString()).toBe('%PDF-');
      await fs.promises.writeFile(path.join(OUTPUT_DIR, 'styled.pdf'), pdf);
    });
  });

  describe('gettingstarted template (external CSS + inline image)', () => {
    const { templatePath, templateCssPath, props } = loadTemplate('gettingstarted');

    it('renders with the bundled data-URI image and dynamic name', async () => {
      const html = (await renderTemplate({ templatePath, templateCssPath, props })) as string;

      expect(html).toContain('Welcome to Muil');
      expect(html).toContain('<b>John</b>');
      expect(html).toContain('data:image/png;base64,');
    });
  });
});
