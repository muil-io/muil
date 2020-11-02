import React, { useState } from 'react';
import styled from 'styled-components';
import { Column } from 'react-virtualized';
import { Table, FloatingButton } from 'shared/components';
import { dateRenderer, booleanRenderer, actionRenderer } from 'shared/components/Table/cellRenderers';
import SpinnerArea from 'shared/components/Spinner/SpinnerArea';
import apiKeysStore from '../../store/apiKeysStore';
import NewApiKeyDialog from './NewApiKeyDialog';
import DeleteKeyDialog from './DeleteKeyDialog';

const Wrapper = styled.div`
	position: relative;
`;

const ApiKeys = () => {
	const { loading, data, toggleKey, createNewKey, deleteKey } = apiKeysStore();
	const [showNewModal, setShowNewModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState();

	if (loading) {
		return <SpinnerArea />;
	}

	return (
		<Wrapper>
			<FloatingButton onClick={() => setShowNewModal(true)} />

			{showNewModal && <NewApiKeyDialog onClose={() => setShowNewModal(false)} onCreateNewKey={createNewKey} />}

			{deleteModal && (
				<DeleteKeyDialog deleteKey={deleteModal} onClose={() => setDeleteModal()} onDeleteKey={deleteKey} />
			)}

			<Table
				items={data}
				defaultSortBy="name"
				noDataTitle="No API Keys"
				noDataSubTitle='Click the "+" button to add a new API key'
			>
				<Column label="Name" dataKey="name" flexGrow={1.5} width={1} />
				<Column label="API key prefix" dataKey="apiKeyPrefix" flexGrow={1} width={1} showOnSize="tablet" />
				<Column
					label="Created"
					dataKey="createdAt"
					flexGrow={1}
					width={1}
					cellRenderer={dateRenderer}
					showOnSize="tablet"
				/>
				<Column
					label="Active"
					dataKey="enabled"
					flexGrow={1}
					width={1}
					cellRenderer={booleanRenderer}
					cellDataGetter={({ rowData: { apiKeyPrefix } }) => ({
						onChange: (isActive) => toggleKey({ prefix: apiKeyPrefix, isActive }),
					})}
				/>

				<Column
					label=""
					dataKey="delete"
					flexGrow={1}
					width={1}
					maxWidth={70}
					showOnSize="mobile"
					cellRenderer={actionRenderer}
					cellDataGetter={({ rowData }) => ({
						label: 'Delete',
						onClick: () => setDeleteModal(rowData),
					})}
				/>
			</Table>
		</Wrapper>
	);
};

export default ApiKeys;
