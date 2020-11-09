import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FORM_ERROR } from 'final-form';
import { Field } from 'react-final-form';
import { Button, Input as BaseInput, CheckBox as BaseCheckBox, Spinner } from 'shared/components';
import media from 'style/media';
import { required } from 'auth/utils/form';
import useSmtp from '../../hooks/useSmtp';
import Layout from '../Layout';

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

const SMTP = () => {
  const {
    isLoading,
    data,
    updateSmtp,
    deleteSmtp,
    testConnection,
    testingConnecting,
    testStatus,
  } = useSmtp();

  const handleSubmit = useCallback(
    async (settings) => {
      try {
        await updateSmtp({
          ...settings,
          port: parseInt(settings.port, 10),
          secure: !!settings.secure,
        });
      } catch (err) {
        return { [FORM_ERROR]: err?.message || 'Unexpected error occurred' };
      }
    },
    [updateSmtp],
  );

  return (
    <Layout
      title="SMTP settings"
      isLoading={isLoading}
      initialValues={data}
      onSubmit={handleSubmit}
      onDelete={deleteSmtp}
      dialogText="Are you sure you want to delete SMTP settings?"
    >
      {({ initialValues, values }) => (
        <>
          <Field
            name="host"
            validate={required}
            validateFields={[]}
            render={({ input, meta }) => (
              <Input
                {...input}
                error={meta.error && meta.touched}
                title="Host"
                placeholder="e.g. smtp.host.com"
              />
            )}
          />
          <Field
            name="port"
            validate={required}
            validateFields={[]}
            render={({ input, meta }) => (
              <Input
                {...input}
                error={meta.error && meta.touched}
                title="Port"
                placeholder="Port"
              />
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
              <Input
                {...input}
                error={meta.error && meta.touched}
                title="User"
                placeholder="User"
              />
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
        </>
      )}
    </Layout>
  );
};

export default SMTP;
