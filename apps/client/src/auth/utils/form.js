import passwordValidator from 'password-validator';
import * as api from '../services/api';

// eslint-disable-next-line new-cap
const passwordSchema = new passwordValidator();
passwordSchema.is().min(8).is().max(20).has().uppercase();

export const composeValidators = (...validators) => (value, allValues) =>
	validators.reduce((error, validator) => error || validator(value, allValues), undefined);

export const required = (value) => (value ? undefined : 'Required');

export const validPassword = (value) =>
	passwordSchema.validate(value) ? undefined : 'Password must be 8 - 20 characters and must contains uppercase';

export const confirmPassword = (confirm, { password }) =>
	confirm === password ? undefined : "Confirm password doesn't match";

export const validProjectId = (value) => {
	if (/^(\d|[a-z]|-)+$/.test(value)) {
		if (value.length < 6) {
			return 'Project ID must be at least 6 characters';
		}
		return;
	}

	return 'Project ID can contain lower case characters, numbers or "-"';
};

export const convertToValidName = (value) =>
	(value || '')
		.replace(/(!|@|#|\\|\/|\$|%|\^|&|\*|\(|\)|'| |\.|=|,|\?|"|:|{|}|<|>|\+|-)/g, '-')
		.replace(/\w/g, (match) => match.toLowerCase());

export const availableProjectId = async (value) => {
	const { exists } = await api.isProjectIdExists(value);
	return exists ? 'Project ID is already exists' : undefined;
};

export const atLeastOneToFieldRequired = (value, allValues) =>
	!value && !allValues.to && !allValues.cc && !allValues.bcc ? 'At least one field is required' : undefined;
