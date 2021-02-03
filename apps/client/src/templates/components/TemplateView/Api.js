import React, { useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import queryString from 'qs';
import { CopyButton, DropDown, flex, Button, Editor as BaseEditor } from 'shared/components';
import * as api from 'shared/services/api';
import ExternalIcon from 'shared/assets/icons/external.svg';
import DownloadIcon from 'shared/assets/icons/download.svg';
import EmailForm from './EmailForm';
import downloadFile from '../../../shared/utils/downloadFile';
import { header4, Header4SemiBold } from '../../../shared/components/Typography/Typography';
import useHostname from '../../../settings/hooks/useHostname';
import scrollbar from 'style/scrollbar';

const TYPES = {
  pdf: {
    label: 'PDF',
    method: 'POST',
    urlSuffix: '?type=pdf',
  },
  html: {
    label: 'HTML',
    method: 'POST',
    urlSuffix: '?type=html',
  },
  png: {
    label: 'Image',
    method: 'POST',
    urlSuffix: '?type=png',
  },
  email: {
    label: 'Email',
    method: 'POST',
    urlSuffix: '/email',
  },
};

const Title = styled(Header4SemiBold)`
  margin: 10px 0 2px;
  color: ${({ theme }) => theme.colors.gray1};

  > span {
    color: green;
  }
`;

const InputRow = styled.div`
  ${flex};
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  background: ${({ theme }) => theme.colors.gray4};
  color: ${({ theme }) => theme.colors.dark};
  border-radius: 5px;
  padding: 7px 5px;
  margin-bottom: 18px;
  transition: border-color 200ms;
`;

const InsideInput = styled.div`
  ${header4}
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  word-break: break-all;
`;

const Editor = styled(BaseEditor)`
  > div {
    max-height: 200px;
    overflow: auto !important;
    ${scrollbar};
  }
`;

const EditorCopyButton = styled(CopyButton)`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const OpenButton = styled(Button)`
  min-width: 170px;
  justify-content: space-between;
  align-items: center;
  display: flex;
  margin: 10px 0;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const Api = ({ dynamicProps, onChange, selectedBranch, templateId, templateName }) => {
  const [selectedType, setSelectedType] = useState('pdf');

  const options = useMemo(
    () => Object.entries(TYPES).map(([key, { label }]) => ({ label, value: key })),
    [],
  );

  const qsProps = useMemo(() => queryString.stringify(dynamicProps), [dynamicProps]);

  const baseUrl = useMemo(() => {
    if (selectedType === 'email') {
      return `/api/templates/${selectedBranch}/${templateId}${TYPES[selectedType].urlSuffix}`;
    }
    return `/api/templates/${selectedBranch}/${templateId}${TYPES[selectedType].urlSuffix}`;
  }, [selectedBranch, selectedType, templateId]);

  // const downloadUrl = useMemo(() => {
  //   if (selectedType === 'email') {
  //     return `${process.env.BASE_URL}${baseUrl}`;
  //   }
  //   return `${process.env.BASE_URL}${baseUrl}${qsProps ? `&${qsProps}` : qsProps}`;
  // }, [baseUrl, qsProps, selectedType]);

  const { data } = useHostname();

  const urlWithHost = useMemo(() => {
    if (process.env.ENV !== 'CLOUD') {
      return `https://${data?.hostname || ''}${baseUrl}`;
    }
    return `https://app.muil.io/${baseUrl}`;
  }, [baseUrl, data?.hostname]);

  const handleDownload = useCallback(async () => {
    try {
      const data = await api.renderTemplate({
        branchId: selectedBranch,
        templateId,
        type: selectedType,
        props: dynamicProps,
        responseType: 'blob',
      });

      downloadFile(data, templateName);
    } catch (err) {}
  }, [dynamicProps, selectedBranch, selectedType, templateId, templateName]);

  return (
    <>
      <DropDown
        selectedValue={selectedType}
        onChange={({ value }) => setSelectedType(value)}
        options={options}
      />

      <Title>
        Request URL: <span>({TYPES[selectedType].method})</span>
      </Title>

      <InputRow>
        <InsideInput>{urlWithHost}</InsideInput>
        <CopyButton copyText={urlWithHost} />
      </InputRow>

      <Title>Request Payload:</Title>

      <Editor value={{ props: dynamicProps }}>
        <EditorCopyButton copyText={JSON.stringify({ props: dynamicProps })} />
      </Editor>

      {selectedType === 'email' ? (
        <EmailForm
          branchId={selectedBranch}
          templateId={templateId}
          dynamicProps={dynamicProps}
          baseTemplateUrl={baseUrl}
        />
      ) : (
        <>
          {qsProps.length <= 2000 && (
            <OpenButton
              onClick={() =>
                window.open(`${process.env.BASE_URL}${baseUrl}${qsProps ? `&${qsProps}` : qsProps}`)
              }
            >
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
