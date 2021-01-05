import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { FORM_ERROR } from 'final-form';
import { Field } from 'react-final-form';
import { Input as BaseInput, DropDown } from 'shared/components';
import { required } from 'auth/utils/form';
import useCloudStorage from '../../hooks/useCloudStorage';
import Layout from '../Layout';

const TypeDropDown = styled(DropDown)`
  width: 100% !important;
  margin: 8px 0;
`;

const Input = styled(BaseInput)`
  width: 100%;
  margin: 8px 0;
`;

const CloudStorage = () => {
  const { isLoading, data, updateCloudStorage, deleteCloudStorage } = useCloudStorage();

  const initialValues = useMemo(() => ({ ...data, type: data?.type ?? 'muil' }), [data]);

  const handleSubmit = useCallback(
    async (settings) => {
      try {
        if (settings.type === 'muil') {
          await deleteCloudStorage();
        } else {
          await updateCloudStorage(settings);
        }
      } catch (err) {
        return { [FORM_ERROR]: err?.message || 'Unexpected error occurred' };
      }
    },
    [deleteCloudStorage, updateCloudStorage],
  );

  return (
    <Layout
      title="Cloud storage settings"
      isLoading={isLoading}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      onDelete={process.env.ENV !== 'CLOUD' && deleteCloudStorage}
      dialogText="Are you sure you want to delete Cloud Storage settings?"
    >
      {({ initialValues, values }) => (
        <>
          <Field
            name="type"
            validate={required}
            validateFields={[]}
            render={({ input, meta }) => (
              <TypeDropDown
                placeHolder={'Select Type'}
                selectedValue={input.value}
                onChange={({ value }) => input.onChange(value)}
                options={(process.env.ENV === 'CLOUD'
                  ? [{ label: "Muil's service", value: 'muil' }]
                  : []
                ).concat([
                  { label: 'AWS', value: 'aws' },
                  { label: 'Cloudinary', value: 'cloudinary' },
                ])}
              />
            )}
          />

          {values.type === 'aws' && (
            <>
              <Field
                name="awsBucketName"
                validate={required}
                validateFields={[]}
                render={({ input, meta }) => (
                  <Input
                    {...input}
                    error={meta.error && meta.touched}
                    title="Bucket Name"
                    placeholder="Bucket Name"
                  />
                )}
              />

              <Field
                name="awsAccessKeyId"
                validate={required}
                validateFields={[]}
                render={({ input, meta }) => (
                  <Input
                    {...input}
                    error={meta.error && meta.touched}
                    title="Access Key ID"
                    placeholder="Access Key ID"
                  />
                )}
              />

              <Field
                name="awsSecretAccessKey"
                validate={required}
                validateFields={[]}
                type="password"
                render={({ input, meta }) => (
                  <Input
                    {...input}
                    error={meta.error && meta.touched}
                    title="Secret Access Key"
                    placeholder={initialValues.type ? '********' : 'Secret Access Key'}
                  />
                )}
              />
            </>
          )}

          {values.type === 'cloudinary' && (
            <>
              <Field
                name="cloudinaryCloudName"
                validate={required}
                validateFields={[]}
                render={({ input, meta }) => (
                  <Input
                    {...input}
                    error={meta.error && meta.touched}
                    title="Cloud Name"
                    placeholder="Cloud Name"
                  />
                )}
              />

              <Field
                name="cloudinaryApiKey"
                validate={required}
                validateFields={[]}
                render={({ input, meta }) => (
                  <Input
                    {...input}
                    error={meta.error && meta.touched}
                    title="Api Key"
                    placeholder="Api Key"
                  />
                )}
              />

              <Field
                name="cloudinaryApiSecret"
                validate={required}
                validateFields={[]}
                type="password"
                render={({ input, meta }) => (
                  <Input
                    {...input}
                    error={meta.error && meta.touched}
                    title="Api Secret"
                    placeholder={initialValues.type ? '********' : 'Api Secret'}
                  />
                )}
              />
            </>
          )}
        </>
      )}
    </Layout>
  );
};

export default CloudStorage;
