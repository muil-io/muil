import React, { useState } from 'react';
import { Dialog } from 'shared/components';

const DeleteBranch = ({ selectedBranch, onDeleteBranch, onClose }) => {
  const [isLoading, setisLoading] = useState(false);

  return (
    <Dialog
      onClose={onClose}
      title={`Delete branch ${selectedBranch}?`}
      confirmButtonText="Delete"
      onConfirm={async () => {
        setisLoading(true);
        await onDeleteBranch({ branch: selectedBranch });
        onClose();
      }}
      onCancel={onClose}
      isLoading={isLoading}
    >
      Are you sure you want to delete branch?
    </Dialog>
  );
};

export default DeleteBranch;
