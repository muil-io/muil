import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { Column } from 'react-virtualized';
import { Page, DropDown, Table, Header3 } from 'shared/components';
import { dateRenderer } from 'shared/components/Table/cellRenderers';
import SpinnerArea from 'shared/components/Spinner/SpinnerArea';
import { groupBy } from 'shared/utils/data';
import useTemplates from 'shared/hooks/useTemplates';
import actionsRenderer from '../utils/actionsRenderer';
import TemplateView from './TemplateView';
import DeleteBranch from './DeleteBranch';

const BranchDropDown = styled(DropDown)`
  height: 27px;
`;

const Prefix = styled(Header3)`
  height: 15px;
  margin-right: 8px;
`;

const Templates = () => {
  const { isLoading, data, deleteBranch } = useTemplates();
  const [selectedBranch, setSelectedBranch] = useState('master');
  const [selectedTemplate, setSelectedTemplate] = useState();

  const groupedByBranch = useMemo(() => groupBy(data || [], 'branch'), [data]);
  const branches = useMemo(
    () => Object.keys(groupedByBranch).map((branch) => ({ label: branch, value: branch })),
    [groupedByBranch],
  );
  const templates = useMemo(() => groupedByBranch?.[selectedBranch] || [], [
    groupedByBranch,
    selectedBranch,
  ]);

  useEffect(() => {
    const selectedBranch = branches.find(({ value }) => value === selectedBranch);
    if (!selectedBranch) {
      setSelectedBranch(branches[0]?.value);
    }
  }, [branches]);

  if (isLoading) {
    return <SpinnerArea />;
  }

  if (selectedTemplate) {
    return (
      <TemplateView
        selectedTemplate={selectedTemplate}
        selectedBranch={selectedBranch}
        onExit={() => setSelectedTemplate()}
      />
    );
  }

  return (
    <Page
      title="Templates"
      renderRight={
        branches.length < 2
          ? undefined
          : () => (
              <>
                <Prefix>Branch:</Prefix>
                <BranchDropDown
                  placeHolder="Select..."
                  selectedValue={selectedBranch}
                  options={branches}
                  onChange={({ value }) => setSelectedBranch(value)}
                />
              </>
            )
      }
    >
      <DeleteBranch selectedBranch={selectedBranch} onDeleteBranch={deleteBranch} />
      <Table
        items={templates}
        defaultSortBy="displayName"
        noDataTitle="No Templates Found"
        noDataSubTitle={
          <>
            Visit our{' '}
            <a
              href="https://docs.muil.io/docs/configurations/cli/#publish"
              target="_blank"
              rel="noopener noreferrer"
            >
              documentation
            </a>{' '}
            to see how to publish templates
          </>
        }
      >
        <Column label="Name" dataKey="displayName" flexGrow={1.5} width={1} />
        <Column
          label="Date"
          dataKey="created"
          flexGrow={1}
          width={1}
          cellRenderer={dateRenderer}
          showOnSize="mobile"
        />
        <Column
          dataKey="actions"
          width={30}
          cellRenderer={actionsRenderer}
          cellDataGetter={({ rowData }) => ({
            onViewTemplate: () => setSelectedTemplate(rowData),
          })}
        />
      </Table>
    </Page>
  );
};

export default Templates;
