import renderTemplate from './renderTemplate';

it('should render template to html', async () => {
  const html = await renderTemplate({
    templatePath: '/Users/shahaf/Source/muil/viewer/.muil/build/Simple.js',
    templateCssPath: '/Users/shahaf/Source/muil/viewer/.muil/build/Simple.css',
  });

  expect(html).toBe(html);
});
