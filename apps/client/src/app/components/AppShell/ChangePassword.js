import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FORM_ERROR } from 'final-form';
import { Field, Form } from 'react-final-form';
import { Input as BaseInput, Dialog, header3 } from 'shared/components';
import { composeValidators, required, validPassword, confirmPassword } from 'auth/utils/form';
import useUser from 'shared/hooks/useUser';

const Input = styled(BaseInput)`
  width: 100%;
  margin: 8px 0;
`;

const Errors = styled.div`
  ${header3};
  color: ${({ theme }) => theme.colors.error};
  text-align: left;
  margin-top: 10px;
`;

const ChangePassword = ({ onClose }) => {
  const { updatePassword } = useUser();

  const handleSubmit = useCallback(
    async ({ oldPassword, password }) => {
      try {
        await updatePassword({ oldPassword, newPassword: password });
        onClose();
      } catch (err) {
        return { [FORM_ERROR]: err?.message || 'Unexpected error occurred' };
      }
    },
    [onClose, updatePassword],
  );

  return (
    <Form
      onSubmit={handleSubmit}
      render={({ handleSubmit, submitting, submitError, pristine, errors }) => (
        <Dialog
          onClose={onClose}
          onCancel={onClose}
          onConfirm={handleSubmit}
          isLoading={submitting}
          title="Change Password"
          usePortal
        >
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

          <Errors>
            {submitError && <div>{submitError}</div>}
            {!pristine && Object.entries(errors).map(([key, error]) => <li key={key}>{error}</li>)}
          </Errors>
        </Dialog>
      )}
    />
  );
};

export default ChangePassword;
