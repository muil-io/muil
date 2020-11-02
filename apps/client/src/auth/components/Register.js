import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { FORM_ERROR } from 'final-form';
import { Form, Field } from 'react-final-form';
import {
	FlexSpace,
	Button as BaseButton,
	Input as BaseInput,
	flexColumn,
	Spinner,
	header3,
	Header4,
} from 'shared/components';
import { composeValidators, required, validPassword } from '../utils/form';
import * as api from '../services/api';
import Auth from './Auth';

const Wrapper = styled.form`
	${flexColumn};
	margin: 0;
`;

const OneRow = styled(FlexSpace)`
	> div {
		width: 48%;
	}
`;

const Input = styled(BaseInput)`
	width: 100%;
	margin: 6px 0;
`;

const SmallTitle = styled(Header4)`
	text-align: left;
	margin: 18px 2px 4px;
	color: ${({ theme }) => theme.colors.gray1};
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

const Register = () => {
	const { push } = useHistory();

	const handleSubmitForm = useCallback(
		async ({ firstName, lastName, email, password }) => {
			try {
				const { token, refreshToken } = await api.register({ firstName, lastName, email, password });
				localStorage.setItem('refreshToken', refreshToken);
				localStorage.setItem('token', token);
				push('/create-project');
			} catch (err) {
				return { [FORM_ERROR]: err?.message || 'Unexpected error occurred' };
			}
		},
		[push],
	);

	return (
		<Auth
			title="Welcome to Muil"
			subtitle="Let’s set up your account"
			linkText={['Already have an account? Login']}
			linkUrl={['/login']}
		>
			<Form
				onSubmit={handleSubmitForm}
				render={({ handleSubmit, submitting, pristine, errors, submitError, validating, values, dirtyFields }) => (
					<Wrapper onSubmit={handleSubmit}>
						<OneRow>
							<Field
								name="firstName"
								validate={required}
								validateFields={[]}
								render={({ input, meta }) => (
									<Input {...input} error={meta.error && meta.touched} placeholder="First Name" />
								)}
							/>

							<Field
								name="lastName"
								validate={required}
								validateFields={[]}
								render={({ input, meta }) => (
									<Input {...input} error={meta.error && meta.touched} placeholder="Last Name" />
								)}
							/>
						</OneRow>

						<Field
							name="email"
							validate={required}
							validateFields={[]}
							render={({ input, meta }) => <Input {...input} error={meta.error && meta.touched} placeholder="Email" />}
						/>

						<Field
							name="password"
							validate={composeValidators(required, validPassword)}
							validateFields={[]}
							type="password"
							render={({ input, meta }) => (
								<Input {...input} error={meta.error && meta.touched} placeholder="Password" />
							)}
						/>

						<SmallTitle>
							By creating an account, you agree to the{' '}
							<a href="https://www.muil.io/service" target="_blank" rel="noopener noreferrer">
								Terms of Service
							</a>
							.
						</SmallTitle>

						<Button disabled={submitting}>{submitting ? <Spinner /> : 'Sign up for free'}</Button>

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

export default Register;
