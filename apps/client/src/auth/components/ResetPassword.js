import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FORM_ERROR } from 'final-form';
import { Form, Field } from 'react-final-form';
import { useHistory, useParams } from 'react-router-dom';
import {
  Button as BaseButton,
  Input as BaseInput,
  flexColumn,
  Spinner,
  header3,
} from 'shared/components';
import useUser from 'shared/hooks/useUser';
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
  margin-top: 20px;
`;

const Errors = styled.div`
  ${header3};
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  margin: 10px 0;
`;

const ResetPassword = () => {
  const { resetPassword } = useUser();
  const { token } = useParams();
  const { push } = useHistory();

  const handleSubmitForm = useCallback(
    async ({ newPassword }) => {
      try {
        await resetPassword({ newPassword, token });
        push('/login');
      } catch (err) {
        return { [FORM_ERROR]: err?.message || 'Unexpected error occurred' };
      }
      return {};
    },
    [push, resetPassword, token],
  );

  return (
    <Auth
      title="Reset your password"
      linkText={['Remember your password? Login']}
      linkUrl={['/login']}
    >
      <Form
        onSubmit={handleSubmitForm}
        render={({ handleSubmit, submitting, submitError }) => (
          <Wrapper onSubmit={handleSubmit}>
            <Field
              name="newPassword"
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

export default ResetPassword;
