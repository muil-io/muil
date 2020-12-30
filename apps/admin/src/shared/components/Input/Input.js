import React from 'react';
import styled, { css } from 'styled-components';
import BaseSpinner from '../Spinner';
import { Header4SemiBold } from '../Typography';
import { semiFadeIn } from 'style/animations';

const Wrapper = styled.div`
  position: relative;
`;

const BaseInput = styled.input`
  color: ${({ theme }) => theme.input.color};
  border: 1px solid ${({ theme }) => theme.input.normal.border};
  background: ${({ theme }) => theme.input.normal.background};
  padding: 15px;
  ${({ isisLoading }) => isisLoading && 'padding-right: 35px'};
  margin: 4px 0;
  border-radius: 4px;
  font-size: 15px;
  outline: none;
  transition: 200ms;

  &::placeholder {
    color: ${({ theme }) => theme.input.placeholder};
  }

  &:disabled {
    border-color: ${({ theme }) => theme.input.disabled.border};
    background: ${({ theme }) => theme.input.disabled.background};
  }

  &:focus:not(:disabled) {
    border-color: ${({ theme }) => theme.input.focus.border};
    background: ${({ theme }) => theme.input.focus.background};
    animation: ${semiFadeIn} 0.2s forwards;
  }

  ${({ error }) =>
    error &&
    css`
      border-color: ${({ theme }) => theme.input.error.border};
      background: ${({ theme }) => theme.input.error.background};
    `}
`;

const Spinner = styled(BaseSpinner)`
  position: absolute;
  right: 10px;
  top: 35%;
`;

const Title = styled(Header4SemiBold)`
  margin: 15px 0 0;
`;

const Input = ({ isLoading, title, multiline, ...props }) => (
  <Wrapper>
    {title && <Title>{title}</Title>}
    {isLoading && <Spinner />}
    <BaseInput {...props} isisLoading={isLoading} as={multiline ? 'textarea' : 'input'} />
  </Wrapper>
);

export default Input;
