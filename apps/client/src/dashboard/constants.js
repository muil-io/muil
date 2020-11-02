import Emails from 'shared/assets/icons/emails.svg';
import Pdfs from 'shared/assets/icons/pdfs.svg';
import HTML from 'shared/assets/icons/html.svg';
import Images from 'shared/assets/icons/images.svg';
import Errors from 'shared/assets/icons/errors.svg';

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
