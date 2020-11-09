import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FORM_ERROR } from 'final-form';
import { Field } from 'react-final-form';
import { Input as BaseInput } from 'shared/components';
import { required } from 'auth/utils/form';
import useHostname from '../../hooks/useHostname';
import Layout from '../Layout';

const Input = styled(BaseInput)`
  width: 100%;
  margin: 8px 0;
`;

const Hostname = () => {
  const { isLoading, data, updateHostname, deleteHostname } = useHostname();

  const handleSubmit = useCallback(
    async (settings) => {
      try {
        await updateHostname(settings);
      } catch (err) {
        return { [FORM_ERROR]: err?.message || 'Unexpected error occurred' };
      }
    },
    [updateHostname],
  );

  return (
    <Layout
      title="Host Name settings"
      isLoading={isLoading}
      initialValues={data}
      onSubmit={handleSubmit}
      onDelete={deleteHostname}
      dialogText="Are you sure you want to delete Host Name?"
    >
      {() => (
        <Field
          name="hostname"
          validate={required}
          validateFields={[]}
          render={({ input, meta }) => (
            <Input
              {...input}
              error={meta.error && meta.touched}
              title="Host Name"
              placeholder="e.g. 1.1.1.1"
            />
          )}
        />
      )}
    </Layout>
  );
};

export default Hostname;
