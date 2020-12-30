import React, { useState } from 'react';
import { Dialog } from 'shared/components';

const DeleteUserDialog = ({ onClose, deleteUser, onDeleteUser }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog
      onClose={onClose}
      title={`Delete ${deleteUser.name}?`}
      confirmButtonText="Delete"
      onConfirm={async () => {
        setIsLoading(true);
        await onDeleteUser({ id: deleteUser.id });
        onClose();
      }}
      onCancel={onClose}
      isLoading={isLoading}
    >
      Are you sure you want to delete user?
    </Dialog>
  );
};

export default DeleteUserDialog;
