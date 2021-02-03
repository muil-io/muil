import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import {
  flexColumn,
  Input as BaseInput,
  Header3,
  BodySmall,
  Button,
  Spinner,
} from 'shared/components';
import { required, atLeastOneToFieldRequired } from 'auth/utils/form';
import * as api from 'shared/services/api';

const FormContainer = styled.form`
  ${flexColumn};
  padding: 20px;
  margin: 0 -20px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray2};

  ${Header3} {
    margin: 0 0 15px;
  }

  ${Button} {
    margin-top: 10px;
  }
`;

const Input = styled(BaseInput)`
  width: 100%;
  background: ${({ theme }) => theme.colors.gray4};
`;

const Note = styled(BodySmall)`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray1};
`;

const Errors = styled(Header3)`
  color: ${({ theme }) => theme.colors.error};
  margin: 10px 0;
`;

const Success = styled(Header3)`
  color: ${({ theme }) => theme.colors.success};
  margin: 10px 0;
`;

const EmailForm = ({ branchId, templateId, dynamicProps }) => {
  const handleSubmitForm = useCallback(
    async ({ subject, to, cc, bcc }) => {
      try {
        await api.sendEmail({
          branchId,
          templateId,
          subject,
          to,
          cc,
          bcc,
          props: dynamicProps,
        });
      } catch (err) {
        return { [FORM_ERROR]: err?.message || 'Unexpected error occurred' };
      }
    },
    [branchId, dynamicProps, templateId],
  );

  return (
    <Form
      onSubmit={handleSubmitForm}
      render={({ handleSubmit, submitting, submitError, submitSucceeded }) => (
        <FormContainer onSubmit={handleSubmit}>
          <Header3>Send a test</Header3>

          <Field
            name="subject"
            validate={required}
            render={({ input, meta }) => (
              <Input {...input} error={meta.error && meta.touched} placeholder="Subject" />
            )}
          />

          <Field
            name="to"
            validate={atLeastOneToFieldRequired}
            render={({ input, meta }) => (
              <Input {...input} error={meta.error && meta.touched} placeholder="To" />
            )}
          />

          <Field
            name="cc"
            validate={atLeastOneToFieldRequired}
            render={({ input, meta }) => (
              <Input {...input} error={meta.error && meta.touched} placeholder="CC" />
            )}
          />

          <Field
            name="bcc"
            validate={atLeastOneToFieldRequired}
            render={({ input, meta }) => (
              <Input {...input} error={meta.error && meta.touched} placeholder="BCC" />
            )}
          />

          <Note>You must have one of the following: To, CC or BCC</Note>

          <Button disabled={submitting}>{submitting ? <Spinner /> : 'Send Test Email'}</Button>

          {submitError && <Errors>{submitError}</Errors>}
          {submitSucceeded && <Success>Email sent successfully</Success>}
        </FormContainer>
      )}
    />
  );
};

export default EmailForm;
