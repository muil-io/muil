import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { Column } from 'react-virtualized';
import { Page, DropDown, Table } from 'shared/components';
import { dateRenderer } from 'shared/components/Table/cellRenderers';
import SpinnerArea from 'shared/components/Spinner/SpinnerArea';
import useProjects from 'shared/hooks/useProjects';
import { groupBy } from 'shared/utils/data';
import useTemplates from 'shared/hooks/useTemplates';
import actionsRenderer from '../utils/actionsRenderer';
import TemplateView from './TemplateView';
import DeleteBranch from './DeleteBranch';

const BranchDropDown = styled(DropDown)`
  height: 27px;
`;

const Templates = () => {
  const { selectedProject } = useProjects();
  const { isLoading, data, deleteBranch } = useTemplates();
  const [selectedBranch, setSelectedBranch] = useState();
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
        baseTemplateUrl={`${process.env.BASE_URL}/templates/${selectedProject}/${selectedBranch}/${selectedTemplate.templateId}`}
        onExit={() => setSelectedTemplate()}
      />
    );
  }

  return (
    <Page
      title="Templates"
      renderRight={() => (
        <BranchDropDown
          placeHolder="Select..."
          selectedValue={selectedBranch}
          options={branches}
          onChange={({ value }) => setSelectedBranch(value)}
        />
      )}
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
          label="Created"
          dataKey="created"
          flexGrow={1}
          width={1}
          cellRenderer={dateRenderer}
          showOnSize="mobile"
        />
        <Column
          label="Updated"
          dataKey="updated"
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
