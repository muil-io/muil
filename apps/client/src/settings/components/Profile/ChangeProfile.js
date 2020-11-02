import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FORM_ERROR } from 'final-form';
import { Form, Field } from 'react-final-form';
import { flexColumn, FlexColumn, Button, Input as BaseInput, Spinner, header3 } from 'shared/components';
import media from 'style/media';
import { required } from 'auth/utils/form';
import userStore from 'shared/store/userStore';

const Container = styled.form`
	${flexColumn};
	margin: 0;

	> div {
		width: 100%;
	}

	${media.tablet`
		flex-direction: row;
		flex-wrap: wrap;
		> div {
			width: 50%;
			padding: 0 10px 10px 0;
			box-sizing: border-box;
		}
	`}
`;

const Input = styled(BaseInput)`
	width: 100%;
	margin: 8px 0;
`;

const Buttons = styled(FlexColumn)`
	width: 100% !important;

	${media.tablet`
		flex-direction: row;
		align-items: center;
		margin-top: 20px;

		${Button} {
			width: 140px;
			margin-right: 12px;
		}
	`}
`;

const Errors = styled.div`
	${header3};
	color: ${({ theme }) => theme.colors.error};
	text-align: left;
	margin-top: 10px;

	${media.tablet`
		margin-top: 0;
	`}
`;

const ChangeProfile = () => {
	const {
		data: { firstName, lastName },
		updateProfile,
	} = userStore();

	const handleSubmit = useCallback(
		async ({ firstName, lastName }) => {
			try {
				await updateProfile({ firstName, lastName });
			} catch (err) {
				return { [FORM_ERROR]: err?.message || 'Unexpected error occurred' };
			}
		},
		[updateProfile],
	);

	return (
		<Form
			onSubmit={handleSubmit}
			initialValues={{ firstName, lastName }}
			render={({ handleSubmit, submitting, submitError }) => (
				<Container onSubmit={handleSubmit}>
					<Field
						name="firstName"
						validate={required}
						validateFields={[]}
						render={({ input, meta }) => <Input {...input} error={meta.error && meta.touched} title="First Name" />}
					/>

					<Field
						name="lastName"
						validate={required}
						validateFields={[]}
						render={({ input, meta }) => <Input {...input} error={meta.error && meta.touched} title="Last Name" />}
					/>

					<Buttons>
						<Button disabled={submitting}>{submitting ? <Spinner /> : 'Update'}</Button>

						{submitError && <Errors>{submitError}</Errors>}
					</Buttons>
				</Container>
			)}
		/>
	);
};

export default ChangeProfile;
