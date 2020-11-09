import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FORM_ERROR } from 'final-form';
import { Field } from 'react-final-form';
import { Input as BaseInput } from 'shared/components';
import { composeValidators, required, validPassword, confirmPassword } from 'auth/utils/form';
import useUser from 'shared/hooks/useUser';
import Layout from '../Layout';

const Input = styled(BaseInput)`
  width: 100%;
  margin: 8px 0;
`;

const ChangePassword = () => {
  const { updatePassword } = useUser();

  const handleSubmit = useCallback(
    async ({ oldPassword, password }) => {
      try {
        await updatePassword({ oldPassword, newPassword: password });
      } catch (err) {
        return { [FORM_ERROR]: err?.message || 'Unexpected error occurred' };
      }
    },
    [updatePassword],
  );

  return (
    <Layout title="Change Password" onSubmit={handleSubmit} showErrorsList>
      {() => (
        <>
          <Field
            name="oldPassword"
            validate={required}
            validateFields={[]}
            type="password"
            render={({ input, meta }) => (
              <Input
                {...input}
                error={meta.error && meta.touched}
                placeholder="Old Password"
                title="Old Password"
              />
            )}
          />

          <Field
            name="password"
            validate={composeValidators(required, validPassword)}
            validateFields={['confirm']}
            type="password"
            render={({ input, meta }) => (
              <Input
                {...input}
                error={meta.error && meta.touched}
                placeholder="New Password"
                title="New Password"
              />
            )}
          />

          <Field
            name="confirm"
            validate={composeValidators(required, confirmPassword)}
            validateFields={['password']}
            type="password"
            render={({ input, meta }) => (
              <Input
                {...input}
                error={meta.error && meta.touched}
                placeholder="Confirm Password"
                title="Confirm Password"
              />
            )}
          />
        </>
      )}
    </Layout>
  );
};

export default ChangePassword;
