import React, { useState } from 'react';
import styled from 'styled-components';
import { Form } from 'react-final-form';
import {
  Card,
  flexColumn,
  FlexColumn,
  Button,
  Spinner,
  header3,
  Header3,
  AutoCompleteOff,
  Dialog,
} from 'shared/components';
import SpinnerArea from 'shared/components/Spinner/SpinnerArea';
import media from 'style/media';

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
  width: 100% !important;

  ${media.tablet`
		margin-top: 0;
	`}
`;

const Layout = ({
  title,
  isLoading,
  initialValues,
  onSubmit,
  children,
  onDelete,
  dialogText,
  showErrorsList,
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (isLoading) {
    return <SpinnerArea />;
  }

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Container>
        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          render={({
            handleSubmit,
            submitting,
            submitError,
            initialValues,
            values,
            pristine,
            errors,
          }) => (
            <BaseForm onSubmit={handleSubmit}>
              <AutoCompleteOff />

              {children({ initialValues, values })}

              <Buttons>
                <Button disabled={submitting}>{submitting ? <Spinner /> : 'Save'}</Button>

                {onDelete && (
                  <DangerButton
                    buttonType="secondary"
                    disabled={submitting}
                    type="reset"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    Delete Settings
                  </DangerButton>
                )}
              </Buttons>

              <Errors>
                {submitError && <div>{submitError}</div>}
                {showErrorsList &&
                  !pristine &&
                  Object.entries(errors).map(([key, error]) => <li key={key}>{error}</li>)}
              </Errors>
            </BaseForm>
          )}
        />
        {showDeleteDialog && (
          <Dialog
            onClose={() => setShowDeleteDialog(false)}
            title={dialogText}
            confirmButtonText="Delete"
            onConfirm={async () => {
              onDelete();
              setShowDeleteDialog(false);
            }}
            onCancel={() => setShowDeleteDialog(false)}
          />
        )}
      </Container>
    </Wrapper>
  );
};

export default Layout;
