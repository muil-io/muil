import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FORM_ERROR } from 'final-form';
import { Form, Field } from 'react-final-form';
import createDecorator from 'final-form-calculate';
import { Button as BaseButton, Input as BaseInput, flexColumn, Spinner, header3 } from 'shared/components';
import { composeValidators, required, validProjectId, availableProjectId, convertToValidName } from '../utils/form';
import projectStore from 'shared/store/projectStore';
import DebouncingValidatingField from './DebouncingValidatingField';
import Auth from './Auth';

const Wrapper = styled.form`
	${flexColumn};
	margin: 0;
`;

const Input = styled(BaseInput)`
	width: 100%;
	margin: 6px 0;
`;

const Button = styled(BaseButton)`
	margin-top: 20px;
`;

const Errors = styled.ul`
	${header3};
	color: ${({ theme }) => theme.colors.error};
	text-align: left;
	margin: 10px -20px;

	> li {
		margin: 5px 22px 5px 5px;
		line-height: 1.4;
	}
`;

const calculator = createDecorator(
	{
		field: 'projectName',
		updates: {
			projectId: convertToValidName,
		},
	},
	{
		field: 'projectId',
		updates: {
			projectId: convertToValidName,
		},
	},
);

const CreateProject = () => {
	const { createProject } = projectStore();

	const handleSubmitForm = useCallback(
		async ({ projectName, projectId }) => {
			try {
				await createProject({ projectName, projectId });
			} catch (err) {
				return { [FORM_ERROR]: err?.message || 'Unexpected error occurred' };
			}
		},
		[createProject],
	);

	return (
		<Auth title="Create your first project">
			<Form
				onSubmit={handleSubmitForm}
				decorators={[calculator]}
				render={({ handleSubmit, submitting, pristine, errors, submitError, validating, values, dirtyFields }) => (
					<Wrapper onSubmit={handleSubmit}>
						<Field
							name="projectName"
							validate={required}
							validateFields={['projectId']}
							render={({ input, meta }) => (
								<Input {...input} error={meta.error && meta.touched} placeholder="Project Name" />
							)}
						/>

						<DebouncingValidatingField
							name="projectId"
							validate={composeValidators(required, validProjectId, availableProjectId)}
							render={({ input, meta }) => (
								<Input
									{...input}
									error={meta.error && (meta.dirty || dirtyFields.projectName)}
									placeholder="Project ID"
									loading={(meta.dirty || dirtyFields.projectName) && validating}
								/>
							)}
						/>

						<Button disabled={submitting}>{submitting ? <Spinner /> : 'Create Project'}</Button>

						<Errors>
							{submitError && <div>{submitError}</div>}
							{!pristine &&
								Object.entries(errors)
									.filter(([, error]) => error !== 'Required')
									.map(([key, error]) => <li key={key}>{error}</li>)}
						</Errors>
					</Wrapper>
				)}
			/>
		</Auth>
	);
};

export default CreateProject;
