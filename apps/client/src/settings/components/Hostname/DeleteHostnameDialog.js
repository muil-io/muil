import React from 'react';
import { Dialog } from 'shared/components';

const DeleteHostnameDialog = ({ onClose, onDelete }) => (
  <Dialog
    onClose={onClose}
    title="Are you sure you want to delete Host Name?"
    confirmButtonText="Delete"
    onConfirm={async () => {
      onDelete();
      onClose();
    }}
    onCancel={onClose}
  ></Dialog>
);

export default DeleteHostnameDialog;
