type Options = {
  css?: string;
  styles?: string;
  content: string;
  shadowSupport?: boolean;
};

export default ({ css = null, styles = '', content = '', shadowSupport = false }: Options) => `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <style>
      html {
        -webkit-print-color-adjust: exact;
        ${shadowSupport ? '-webkit-filter: opacity(1);' : ''}
      }

      body {
        margin: 0;
        padding: 0;
      }
    </style>
    ${css ? `<style type="text/css">${css}</style>` : ''}
    ${styles}
  </head>

  <body>
    ${content}

    <!-- prevent Gmail on iOS font size manipulation -->
    <div style="display:none; white-space:nowrap; font:15px courier; line-height:0;"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>
  </body>
  </html>
`;
