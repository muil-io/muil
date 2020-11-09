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
} from 'shared/components';
import SpinnerArea from 'shared/components/Spinner/SpinnerArea';
import media from 'style/media';
import { required } from 'auth/utils/form';
import useHostname from '../../hooks/useHostname';
import DeleteHostnameDialog from './DeleteHostnameDialog';

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

const Hostname = () => {
  const { isLoading, data, updateHostname, deleteHostname } = useHostname();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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

  if (isLoading) {
    return <SpinnerArea />;
  }

  return (
    <Wrapper>
      <Title>Host Name settings</Title>
      <Container>
        <Form
          onSubmit={handleSubmit}
          initialValues={data}
          render={({ handleSubmit, submitting, submitError, initialValues, values }) => (
            <BaseForm onSubmit={handleSubmit}>
              <AutoCompleteOff />

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
          <DeleteHostnameDialog
            onClose={() => setShowDeleteDialog(false)}
            onDelete={deleteHostname}
          />
        )}
      </Container>
    </Wrapper>
  );
};

export default Hostname;
