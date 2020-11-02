import Emails from './assets/icons/emails.svg';
import Pdfs from './assets/icons/pdfs.svg';
import HTML from './assets/icons/html.svg';
import Images from './assets/icons/images.svg';
import Errors from './assets/icons/errors.svg';

export const ACTIVITIES_MAP = {
  email: {
    title: 'Emails Sent',
    shortTitle: 'Emails',
    singular: 'Email',
    color: 'category1',
    icon: Emails,
  },
  pdf: {
    title: 'PDFs Generated',
    shortTitle: 'PDFs',
    singular: 'PDF',
    color: 'category2',
    icon: Pdfs,
  },
  html: {
    title: 'HTML Generated',
    shortTitle: 'HTML',
    singular: 'HTML',
    color: 'category3',
    icon: HTML,
  },
  png: {
    title: 'Images Generated',
    shortTitle: 'Images',
    singular: 'Image',
    color: 'category4',
    icon: Images,
  },
  error: {
    title: 'Errors',
    shortTitle: 'Errors',
    singular: 'Error',
    color: 'category5',
    icon: Errors,
  },
};

export const SHORT_DATE_FORMAT = 'MMM DD';
export const LONG_DATE_FORMAT = 'MMM DD YYYY';
export const DATE_AND_TIME_FORMAT = 'MMM DD YYYY, HH:mm:ss';
export const SHORT_DATE_AND_TIME_FORMAT = 'MMM DD, HH:mm';

export const TIME_RANGE_OPTIONS = [
  { label: 'Last 7 Days', value: 7 },
  { label: 'Last 14 Days', value: 14 },
  { label: 'Last Month', value: 31 },
];
