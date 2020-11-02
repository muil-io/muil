import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FORM_ERROR } from 'final-form';
import { Form, Field } from 'react-final-form';
import { useHistory } from 'react-router-dom';
import {
  Button as BaseButton,
  Input as BaseInput,
  flexColumn,
  Spinner,
  header3,
} from 'shared/components';
import { required } from '../utils/form';
import * as api from '../services/api';
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

const Errors = styled.div`
  ${header3};
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  margin: 10px 0;
`;

const Login = () => {
  const { push } = useHistory();

  const handleSubmitForm = useCallback(
    async ({ email, password }) => {
      try {
        await api.login({ email, password });
        push('/dashboard');
      } catch (err) {
        return { [FORM_ERROR]: 'The email or password is incorrect' };
      }
    },
    [push],
  );

  return (
    <Auth
      title="Welcome to Muil"
      subtitle="Let’s login to your account"
      linkText={["Don't have an account? Sign up", 'Forgot your password?']}
      linkUrl={['/register', '/forgot']}
    >
      <Form
        onSubmit={handleSubmitForm}
        render={({ handleSubmit, submitting, submitError }) => (
          <Wrapper onSubmit={handleSubmit}>
            <Field
              name="email"
              validate={required}
              render={({ input, meta }) => (
                <Input {...input} error={meta.error && meta.touched} placeholder="Email" />
              )}
            />

            <Field
              name="password"
              validate={required}
              type="password"
              render={({ input, meta }) => (
                <Input {...input} error={meta.error && meta.touched} placeholder="Password" />
              )}
            />

            <Button disabled={submitting}>{submitting ? <Spinner /> : 'Login'}</Button>

            <Errors>{submitError && <div>{submitError}</div>}</Errors>
          </Wrapper>
        )}
      />
    </Auth>
  );
};

export default Login;
