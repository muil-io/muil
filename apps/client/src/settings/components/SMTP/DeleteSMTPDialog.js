import React from 'react';
import { Dialog } from 'shared/components';

const DeleteSMTPDialog = ({ onClose, onDelete }) => (
	<Dialog
		onClose={onClose}
		title="Are you sure you want to delete SMTP settings?"
		confirmButtonText="Delete"
		onConfirm={async () => {
			onDelete();
			onClose();
		}}
		onCancel={onClose}
	></Dialog>
);

export default DeleteSMTPDialog;
