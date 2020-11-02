import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { FORM_ERROR } from 'final-form';
import { Form, Field } from 'react-final-form';
import {
	Card,
	flexColumn,
	FlexColumn,
	Button,
	Input as BaseInput,
	CheckBox as BaseCheckBox,
	Spinner,
	header3,
	Header3,
	AutoCompleteOff,
} from 'shared/components';
import SpinnerArea from 'shared/components/Spinner/SpinnerArea';
import media from 'style/media';
import { required } from 'auth/utils/form';
import smtpStore from '../../store/smtpStore';
import DeleteSMTPDialog from './DeleteSMTPDialog';

const Wrapper = styled.div`
	margin: 0 auto;

	${media.tablet`width: 80%;`}
	${media.desktop`width: 60%;`}
`;

const Container = styled(Card).attrs(() => ({ level: 3 }))`
	margin: 0 auto;
`;

const Title = styled(Header3)`
	margin: 50px 0 10px;
`;

const BaseForm = styled.form`
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

const CheckBox = styled(BaseCheckBox)`
	width: 100% !important;
	margin: 6px 0;
`;

const TestButtonWrapper = styled.div`
	padding-top: 38px !important;

	> button {
		width: 100%;
	}

	${media.tablet`
		> button {
			width: auto;
		}
	`}
`;

const TestResult = styled.div`
	color: ${({ theme, isError }) => (isError ? theme.colors.error : theme.colors.success)};
	width: 100% !important;
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

const DangerButton = styled(Button)`
	border-color: ${({ theme }) => theme.colors.error} !important;
	color: ${({ theme }) => theme.colors.error} !important;
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

const SMTP = () => {
	const { loading, data, updateSmtp, deleteSmtp, testConnection, testingConnecting, testStatus } = smtpStore();
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	const handleSubmit = useCallback(
		async (settings) => {
			try {
				await updateSmtp(settings);
			} catch (err) {
				return { [FORM_ERROR]: err?.message || 'Unexpected error occurred' };
			}
		},
		[updateSmtp],
	);

	if (loading) {
		return <SpinnerArea />;
	}

	return (
		<Wrapper>
			<Title>SMTP settings</Title>
			<Container>
				<Form
					onSubmit={handleSubmit}
					initialValues={data}
					render={({ handleSubmit, submitting, submitError, initialValues, values }) => (
						<BaseForm onSubmit={handleSubmit}>
							<AutoCompleteOff />

							<Field
								name="host"
								validate={required}
								validateFields={[]}
								render={({ input, meta }) => (
									<Input {...input} error={meta.error && meta.touched} title="Host" placeholder="e.g. smtp.host.com" />
								)}
							/>

							<Field
								name="port"
								validate={required}
								validateFields={[]}
								render={({ input, meta }) => (
									<Input {...input} error={meta.error && meta.touched} title="Port" placeholder="Port" />
								)}
							/>

							<Field
								name="secure"
								render={({ input, meta }) => (
									<CheckBox {...input} error={meta.error && meta.touched} content="Secure" />
								)}
							/>

							<Field
								name="user"
								validate={required}
								validateFields={[]}
								render={({ input, meta }) => (
									<Input {...input} error={meta.error && meta.touched} title="User" placeholder="User" />
								)}
							/>

							<Field
								name="pass"
								validate={(value, values) => (values.host ? undefined : required)}
								validateFields={[]}
								type="password"
								render={({ input, meta }) => (
									<Input
										{...input}
										error={meta.error && meta.touched}
										title="Password"
										placeholder={initialValues.host ? '********' : 'Password'}
									/>
								)}
							/>

							<Field
								name="defaultFrom"
								render={({ input, meta }) => (
									<Input
										{...input}
										error={meta.error && meta.touched}
										title="Default from"
										placeholder={'"Example" <no-replay@example.com>'}
									/>
								)}
							/>

							<TestButtonWrapper>
								<Button disabled={testingConnecting} onClick={() => testConnection(values)}>
									{testingConnecting ? <Spinner /> : 'Test Connection'}
								</Button>
							</TestButtonWrapper>

							{testStatus && (
								<TestResult isError={testStatus !== 'success'}>
									{testStatus === 'success' ? '✔ Connection Established' : `✖ ${testStatus}`}
								</TestResult>
							)}

							<Buttons>
								<Button disabled={submitting}>{submitting ? <Spinner /> : 'Save'}</Button>

								<DangerButton
									buttonType="secondary"
									disabled={submitting}
									type="reset"
									onClick={() => setShowDeleteDialog(true)}
								>
									Delete Settings
								</DangerButton>

								{submitError && <Errors>{submitError}</Errors>}
							</Buttons>
						</BaseForm>
					)}
				/>
				{showDeleteDialog && <DeleteSMTPDialog onClose={() => setShowDeleteDialog(false)} onDelete={deleteSmtp} />}
			</Container>
		</Wrapper>
	);
};

export default SMTP;
