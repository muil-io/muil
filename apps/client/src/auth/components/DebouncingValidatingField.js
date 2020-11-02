import React, { useRef } from 'react';
import { Field } from 'react-final-form';

const DebouncingValidatingField = ({ validate, debounce = 250, ...props }) => {
	const timerId = useRef();
	const handleClearTimeout = useRef();

	const handleValidate = (...args) =>
		new Promise(resolve => {
			if (handleClearTimeout.current) {
				handleClearTimeout.current();
			}

			timerId.current = setTimeout(() => {
				resolve(validate(...args));
			}, debounce);

			handleClearTimeout.current = () => {
				clearTimeout(timerId.current);
				resolve();
			};
		});

	return <Field {...props} validate={handleValidate} />;
};

export default DebouncingValidatingField;
