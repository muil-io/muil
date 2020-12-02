import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { FORM_ERROR } from 'final-form';
import { Form, Field } from 'react-final-form';
import createDecorator from 'final-form-calculate';
import {
  Button as BaseButton,
  Input as BaseInput,
  flexColumn,
  Spinner,
  header3,
  Header4,
} from 'shared/components';
import useUser from 'shared/hooks/useUser';
import { composeValidators, required, validPassword, convertToValidName } from '../utils/form';
import Auth from './Auth';

const Wrapper = styled.form`
  ${flexColumn};
  margin: 0;
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

const calculator = createDecorator({
  field: 'projectName',
  updates: {
    projectName: convertToValidName,
  },
});

const Register = () => {
  const { register } = useUser();
  const { push } = useHistory();

  const handleSubmitForm = useCallback(
    async ({ name, email, password, projectName }) => {
      try {
        await register({ name, email, password, projectName });
        push('/dashboard');
      } catch (err) {
        return { [FORM_ERROR]: err?.message || 'Unexpected error occurred' };
      }
      return {};
    },
    [push, register],
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
        decorators={[calculator]}
        render={({ handleSubmit, submitting, pristine, errors, submitError }) => (
          <Wrapper onSubmit={handleSubmit}>
            <Field
              name="name"
              validate={required}
              validateFields={[]}
              render={({ input, meta }) => (
                <Input {...input} error={meta.error && meta.touched} placeholder="Full Name" />
              )}
            />

            <Field
              name="email"
              validate={required}
              validateFields={[]}
              render={({ input, meta }) => (
                <Input {...input} error={meta.error && meta.touched} placeholder="Email" />
              )}
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

            {process.env.IS_CLOUD && (
              <Field
                name="projectName"
                validate={required}
                validateFields={[]}
                render={({ input, meta }) => (
                  <Input {...input} error={meta.error && meta.touched} placeholder="Project Name" />
                )}
              />
            )}

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
