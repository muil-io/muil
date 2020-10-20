export type File = {
  originalname: string;
  buffer: Buffer;
};

export type RenderOptions = {
  type?: 'html' | 'png' | 'pdf';
  inlineCss: boolean;
  minifyHtml: boolean;
};
