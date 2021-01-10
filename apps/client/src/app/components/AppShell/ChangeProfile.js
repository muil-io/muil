import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FORM_ERROR } from 'final-form';
import { Field, Form } from 'react-final-form';
import { Dialog, Input as BaseInput } from 'shared/components';
import { required } from 'auth/utils/form';
import useUser from 'shared/hooks/useUser';

const Input = styled(BaseInput)`
  width: 100%;
  margin: 8px 0;
`;

const ChangeProfile = ({ onClose }) => {
  const { data, updateProfile } = useUser();

  const handleSubmit = useCallback(
    async ({ name }) => {
      try {
        await updateProfile({ id: data.id, name });
        onClose();
      } catch (err) {
        return { [FORM_ERROR]: err?.message || 'Unexpected error occurred' };
      }
    },
    [data.id, onClose, updateProfile],
  );

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={data}
      render={({ handleSubmit, submitting }) => (
        <Dialog
          onClose={onClose}
          onCancel={onClose}
          onConfirm={handleSubmit}
          isLoading={submitting}
          title="Profile"
          usePortal
        >
          <Field
            name="name"
            validate={required}
            validateFields={[]}
            render={({ input, meta }) => (
              <Input {...input} error={meta.error && meta.touched} title="Name" />
            )}
          />
        </Dialog>
      )}
    />
  );
};

export default ChangeProfile;
