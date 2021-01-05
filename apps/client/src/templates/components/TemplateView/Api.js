import React, { useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import queryString from 'qs';
import { CopyButton, DropDown, flexMiddle, Button } from 'shared/components';
import * as api from 'shared/services/api';
import ExternalIcon from 'shared/assets/icons/external.svg';
import DownloadIcon from 'shared/assets/icons/download.svg';
import EmailForm from './EmailForm';
import downloadFile from '../../../shared/utils/downloadFile';

const TYPES = {
  pdf: {
    label: 'PDF',
    method: 'GET',
    urlSuffix: '?type=pdf',
  },
  html: {
    label: 'HTML',
    method: 'GET',
    urlSuffix: '?type=html',
  },
  image: {
    label: 'Image',
    method: 'GET',
    urlSuffix: '?type=png',
  },
  email: {
    label: 'Email',
    method: 'POST',
    urlSuffix: '/email',
  },
};

const InputRow = styled.div`
  ${flexMiddle};
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  background: ${({ theme }) => theme.colors.gray4};
  color: ${({ theme }) => theme.colors.dark};
  border-radius: 5px;
  padding: 7px 5px;
  margin-bottom: 18px;
  transition: border-color 200ms;
`;

const Method = styled.div`
  color: green;
  font-weight: bold;
  font-size: 11px;
  margin-right: 3px;
`;

const InsideInput = styled.input.attrs(() => ({ readOnly: true }))`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
`;

const OpenButton = styled(Button)`
  svg {
    width: 20px;
    height: 20px;
    margin: 0 10px -3px 15px;
  }
`;

const Api = ({ dynamicProps, onChange, baseTemplateUrl, templateName }) => {
  const [selectedType, setSelectedType] = useState('pdf');

  const options = useMemo(
    () => Object.entries(TYPES).map(([key, { label }]) => ({ label, value: key })),
    [],
  );

  const qsProps = useMemo(() => queryString.stringify(dynamicProps), [dynamicProps]);

  const url = useMemo(() => {
    if (selectedType === 'email') {
      return `${baseTemplateUrl}${TYPES[selectedType].urlSuffix}`;
    }
    return `${baseTemplateUrl}${TYPES[selectedType].urlSuffix}${qsProps ? `&${qsProps}` : qsProps}`;
  }, [baseTemplateUrl, qsProps, selectedType]);

  const handleDownload = useCallback(async () => {
    try {
      const data = await api.post(
        `${baseTemplateUrl}${TYPES[selectedType].urlSuffix}`,
        { props: dynamicProps },
        { responseType: 'blob' },
      );

      downloadFile(data, templateName);
    } catch (err) {}
  }, [baseTemplateUrl, dynamicProps, selectedType, templateName]);

  return (
    <>
      <DropDown
        selectedValue={selectedType}
        onChange={({ value }) => setSelectedType(value)}
        options={options}
      />

      <InputRow>
        <Method>{TYPES[selectedType].method}</Method>
        <InsideInput value={url} />
        <CopyButton copyText={url} />
      </InputRow>

      {selectedType === 'email' ? (
        <EmailForm dynamicProps={dynamicProps} baseTemplateUrl={url} />
      ) : (
        <>
          {qsProps.length <= 2000 && (
            <OpenButton onClick={() => window.open(url)}>
              Open Template
              <ExternalIcon />
            </OpenButton>
          )}

          <OpenButton onClick={handleDownload}>
            Download
            <DownloadIcon />
          </OpenButton>
        </>
      )}
    </>
  );
};

export default Api;
