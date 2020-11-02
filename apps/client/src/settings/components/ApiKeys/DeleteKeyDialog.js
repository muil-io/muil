import React, { useState } from 'react';
import { Dialog } from 'shared/components';

const NewApiKeyDialog = ({ onClose, deleteKey, onDeleteKey }) => {
	const [loading, setLoading] = useState(false);

	return (
		<Dialog
			onClose={onClose}
			title={`Delete ${deleteKey.name}?`}
			confirmButtonText="Delete"
			onConfirm={async () => {
				setLoading(true);
				await onDeleteKey({ prefix: deleteKey.apiKeyPrefix });
				onClose();
			}}
			onCancel={onClose}
			loading={loading}
		>
			Are you sure you want to delete key?
		</Dialog>
	);
};

export default NewApiKeyDialog;
