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
import * as api from 'shared/services/api';
import { required } from '../utils/form';
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
  margin-top: 10px;
`;

const Errors = styled.div`
  ${header3};
  color: red;
  text-align: center;
  margin: 10px 0;
`;

const ForgotPassword = () => {
  const { push } = useHistory();

  const handleSubmitForm = useCallback(
    async ({ email }) => {
      try {
        await api.forgotPassword({ email });
        push('/forgot/success');
      } catch (err) {
        return { [FORM_ERROR]: err?.message || 'Unexpected error occurred' };
      }
    },
    [push],
  );

  return (
    <Auth
      title="Forgot you password?"
      subtitle="Let’s reset your password"
      linkText={['Remember your password? Login']}
      linkUrl={['/login']}
    >
      <Form
        onSubmit={handleSubmitForm}
        render={({ handleSubmit, submitting, errors, submitError }) => (
          <Wrapper onSubmit={handleSubmit}>
            <Field
              name="email"
              validate={required}
              render={({ input, meta }) => (
                <Input {...input} error={meta.error && meta.touched} placeholder="Email" />
              )}
            />

            <Button disabled={submitting}>{submitting ? <Spinner /> : 'Reset Password'}</Button>

            <Errors>{submitError && <div>{submitError}</div>}</Errors>
          </Wrapper>
        )}
      />
    </Auth>
  );
};

export default ForgotPassword;
