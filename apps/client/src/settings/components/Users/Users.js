import React, { useState } from 'react';
import styled from 'styled-components';
import { Column } from 'react-virtualized';
import { FloatingButton } from 'shared/components';
import { actionRenderer } from 'shared/components/Table/cellRenderers';
import SpinnerArea from 'shared/components/Spinner/SpinnerArea';
import useUser from 'shared/hooks/useUser';
import useUsers from '../../hooks/useUsers';
import InviteUserDialog from './InviteUserDialog';
import DeleteUserDialog from './DeleteUserDialog';
import InfiniteTable from '../../../shared/components/Table/InfiniteTable';

const Wrapper = styled.div`
  position: relative;
`;

const Users = () => {
  const {
    isLoading,
    isFetchingMore,
    data,
    fetchMore,
    canFetchMore,
    sort,
    handleSort,
    inviteUser,
    deleteUser,
  } = useUsers();
  const [showNewModal, setShowNewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState();

  const { data: user } = useUser();

  if (isLoading) {
    return <SpinnerArea />;
  }

  return (
    <Wrapper>
      <FloatingButton onClick={() => setShowNewModal(true)} />

      {showNewModal && (
        <InviteUserDialog onClose={() => setShowNewModal(false)} onInviteUser={inviteUser} />
      )}

      {deleteModal && (
        <DeleteUserDialog
          deleteUser={deleteModal}
          onClose={() => setDeleteModal()}
          onDeleteUser={deleteUser}
        />
      )}

      <InfiniteTable
        items={data}
        isFetchingMore={isFetchingMore}
        fetchMore={fetchMore}
        canFetchMore={canFetchMore}
        sortBy={sort.sortBy}
        sortDirection={sort.sortDirection}
        sort={handleSort}
        noDataTitle="No Users"
        noDataSubTitle='Click the "+" button to invite a user'
      >
        <Column label="Name" dataKey="name" flexGrow={1} width={1} />
        <Column label="Email" dataKey="email" flexGrow={1} width={1} />
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
            onClick: rowData.id !== user.id ? () => setDeleteModal(rowData) : null,
          })}
        />
      </InfiniteTable>
    </Wrapper>
  );
};

export default Users;
