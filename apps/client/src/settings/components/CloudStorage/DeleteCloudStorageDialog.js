import React from 'react';
import { Dialog } from 'shared/components';

const DeleteCloudStorageDialog = ({ onClose, onDelete }) => (
  <Dialog
    onClose={onClose}
    title="Are you sure you want to delete Cloud Storage settings?"
    confirmButtonText="Delete"
    onConfirm={async () => {
      onDelete();
      onClose();
    }}
    onCancel={onClose}
  ></Dialog>
);

export default DeleteCloudStorageDialog;
