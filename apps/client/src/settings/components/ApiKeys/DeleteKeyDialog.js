import React, { useState } from 'react';
import { Dialog } from 'shared/components';

const NewApiKeyDialog = ({ onClose, deleteKey, onDeleteKey }) => {
  const [isLoading, setisLoading] = useState(false);

  return (
    <Dialog
      onClose={onClose}
      title={`Delete ${deleteKey.name}?`}
      confirmButtonText="Delete"
      onConfirm={async () => {
        setisLoading(true);
        await onDeleteKey({ prefix: deleteKey.id });
        onClose();
      }}
      onCancel={onClose}
      isLoading={isLoading}
    >
      Are you sure you want to delete key?
    </Dialog>
  );
};

export default NewApiKeyDialog;
