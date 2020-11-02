import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FORM_ERROR } from 'final-form';
import { Form, Field } from 'react-final-form';
import {
  flexColumn,
  FlexColumn,
  Button,
  Input as BaseInput,
  Spinner,
  header3,
} from 'shared/components';
import media from 'style/media';
import { composeValidators, required, validPassword, confirmPassword } from 'auth/utils/form';
import useUser from 'shared/hooks/useUser';

const Container = styled.form`
  ${flexColumn};
  margin: 0;

  > div {
    width: 100%;
  }

  ${media.tablet`
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

const ChangePassword = () => {
  const { updatePassword } = useUser();

  const handleSubmit = useCallback(
    async ({ password }) => {
      try {
        await updatePassword({ password });
      } catch (err) {
        return { [FORM_ERROR]: err?.message || 'Unexpected error occurred' };
      }
    },
    [updatePassword],
  );

  return (
    <Form
      onSubmit={handleSubmit}
      render={({ handleSubmit, submitting, submitError, pristine, errors }) => (
        <Container onSubmit={handleSubmit}>
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

          <Buttons>
            <Button disabled={submitting}>{submitting ? <Spinner /> : 'Update'}</Button>
          </Buttons>

          <Errors>
            {submitError && <div>{submitError}</div>}
            {!pristine && Object.entries(errors).map(([key, error]) => <li key={key}>{error}</li>)}
          </Errors>
        </Container>
      )}
    />
  );
};

export default ChangePassword;
