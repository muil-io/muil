import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FORM_ERROR } from 'final-form';
import { Field } from 'react-final-form';
import { Input as BaseInput } from 'shared/components';
import { required } from 'auth/utils/form';
import useUser from 'shared/hooks/useUser';
import Layout from '../Layout';

const Input = styled(BaseInput)`
  width: 100%;
  margin: 8px 0;
`;

const ChangeProfile = () => {
  const { data, updateProfile } = useUser();

  const handleSubmit = useCallback(
    async ({ name }) => {
      try {
        await updateProfile({ name });
      } catch (err) {
        return { [FORM_ERROR]: err?.message || 'Unexpected error occurred' };
      }
    },
    [updateProfile],
  );

  return (
    <Layout title="Profile" initialValues={data} onSubmit={handleSubmit}>
      {() => (
        <Field
          name="name"
          validate={required}
          validateFields={[]}
          render={({ input, meta }) => (
            <Input {...input} error={meta.error && meta.touched} title="Name" />
          )}
        />
      )}
    </Layout>
  );
};

export default ChangeProfile;
