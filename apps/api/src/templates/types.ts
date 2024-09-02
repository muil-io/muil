export type PageFormat =
  | 'a0'
  | 'a1'
  | 'a2'
  | 'a3'
  | 'a4'
  | 'a5'
  | 'a6'
  | 'tabloid'
  | 'letter'
  | 'legal'
  | 'ledger';

export type File = {
  originalname: string;
  buffer: Buffer | string;
};

export type RenderOptions = {
  type?: 'html' | 'png' | 'pdf';
  inlineCss: boolean;
  minifyHtml: boolean;
  pdfFormat?: PageFormat;
  pdfOrientation?: 'portrait' | 'landscape';
  writeLog?: boolean;
};
