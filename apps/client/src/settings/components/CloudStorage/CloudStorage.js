import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { FORM_ERROR } from 'final-form';
import { Form, Field } from 'react-final-form';
import {
  Card,
  flexColumn,
  FlexColumn,
  Button,
  Input as BaseInput,
  Spinner,
  header3,
  Header3,
  AutoCompleteOff,
  DropDown,
} from 'shared/components';
import SpinnerArea from 'shared/components/Spinner/SpinnerArea';
import media from 'style/media';
import { required } from 'auth/utils/form';
import useCloudStorage from '../../hooks/useCloudStorage';
import DeleteCloudStorageDialog from './DeleteCloudStorageDialog';

const Wrapper = styled.div`
  margin: 0 auto;

  ${media.tablet`width: 80%;`}
  ${media.desktop`width: 60%;`}
`;

const Container = styled(Card).attrs(() => ({ level: 3 }))`
  margin: 0 auto;
`;

const Title = styled(Header3)`
  margin: 50px 0 10px;
`;

const BaseForm = styled.form`
  ${flexColumn};
  margin: 0;

  > div {
    width: 100%;
  }

  ${media.tablet`
		flex-direction: row;
		flex-wrap: wrap;
		> div {
			width: 50%;
			padding: 0 10px 10px 0;
			box-sizing: border-box;
		}
	`}
`;

const TypeDropDown = styled(DropDown)`
  width: 100% !important;
  margin: 8px 0;
`;

const Input = styled(BaseInput)`
  width: 100%;
  margin: 8px 0;
`;

const Buttons = styled(FlexColumn)`
  width: 100% !important;

  ${media.tablet`
		flex-direction: row;
		align-items: center;
		margin-top: 20px;

		${Button} {
			width: 140px;
			margin-right: 12px;
		}
	`}
`;

const DangerButton = styled(Button)`
  border-color: ${({ theme }) => theme.colors.error} !important;
  color: ${({ theme }) => theme.colors.error} !important;
`;

const Errors = styled.div`
  ${header3};
  color: ${({ theme }) => theme.colors.error};
  text-align: left;
  margin-top: 10px;

  ${media.tablet`
		margin-top: 0;
	`}
`;

const CloudStorage = () => {
  const { isLoading, data, updateCloudStorage, deleteCloudStorage } = useCloudStorage();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleSubmit = useCallback(
    async (settings) => {
      try {
        await updateCloudStorage(settings);
      } catch (err) {
        return { [FORM_ERROR]: err?.message || 'Unexpected error occurred' };
      }
    },
    [updateCloudStorage],
  );

  if (isLoading) {
    return <SpinnerArea />;
  }

  return (
    <Wrapper>
      <Title>Cloud storage settings</Title>
      <Container>
        <Form
          onSubmit={handleSubmit}
          initialValues={data}
          render={({ handleSubmit, submitting, submitError, initialValues, values }) => (
            <BaseForm onSubmit={handleSubmit}>
              <AutoCompleteOff />

              <Field
                name="type"
                validate={required}
                validateFields={[]}
                render={({ input, meta }) => (
                  <TypeDropDown
                    placeHolder="Select Type"
                    selectedValue={input.value}
                    onChange={({ value }) => input.onChange(value)}
                    options={[
                      { label: 'AWS', value: 'aws' },
                      { label: 'Cloudinary', value: 'cloudinary' },
                    ]}
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
                    name="cloudinaryApiSecert"
                    validate={required}
                    validateFields={[]}
                    type="password"
                    render={({ input, meta }) => (
                      <Input
                        {...input}
                        error={meta.error && meta.touched}
                        title="Api Secert"
                        placeholder={initialValues.type ? '********' : 'Api Secert'}
                      />
                    )}
                  />
                </>
              )}

              <Buttons>
                <Button disabled={submitting}>{submitting ? <Spinner /> : 'Save'}</Button>

                <DangerButton
                  buttonType="secondary"
                  disabled={submitting}
                  type="reset"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  Delete Settings
                </DangerButton>

                {submitError && <Errors>{submitError}</Errors>}
              </Buttons>
            </BaseForm>
          )}
        />
        {showDeleteDialog && (
          <DeleteCloudStorageDialog
            onClose={() => setShowDeleteDialog(false)}
            onDelete={deleteCloudStorage}
          />
        )}
      </Container>
    </Wrapper>
  );
};

export default CloudStorage;
