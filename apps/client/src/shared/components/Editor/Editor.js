import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import BaseEditor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-coy.css';
import { Header4SemiBold } from '../Typography';

const Wrapper = styled.div`
  .container__editor {
    border: 1px solid
      ${({ theme, hasError }) => (hasError ? theme.colors.error : theme.colors.gray2)}!important;
    border-radius: 5px;
    background: ${({ theme }) => theme.colors.gray4};
    transition: border-color 200ms;
    font-size: 12px;
    line-height: 16px;
    margin: 6px 0;

    > * {
      font-family: Monaco, Menlo, 'Ubuntu Mono', Consolas, source-code-pro, monospace;
    }

    textarea {
      outline: none;
    }
  }
`;

const Title = styled(Header4SemiBold)`
  margin: 15px 0 0;
`;

const ErrorMessage = styled.div`
  font-size: 11px;
  height: 13px;
  color: red;
`;

const Editor = ({ title, value, onChange }) => {
  const [code, setCode] = useState('');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    try {
      const stringValue = JSON.stringify(value || {}, null, 4);
      setCode(stringValue);
      setHasError(false);
    } catch (err) {
      setHasError(true);
    }
  }, [value]);

  const handleChangeCode = useCallback(
    (code) => {
      setCode(code);
      try {
        const parsedValue = JSON.parse(code);
        onChange(parsedValue);
        setHasError(false);
      } catch (err) {
        setHasError(true);
      }
    },
    [onChange],
  );

  return (
    <Wrapper hasError={hasError}>
      {title && <Title>{title}</Title>}
      <BaseEditor
        value={code}
        onValueChange={handleChangeCode}
        highlight={(code) => highlight(code, languages.json)}
        className="container__editor"
      />
      <ErrorMessage>{hasError && 'Invalid JSON'}</ErrorMessage>
    </Wrapper>
  );
};

export default Editor;
