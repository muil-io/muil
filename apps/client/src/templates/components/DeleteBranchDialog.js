import React, { useState } from 'react';
import { Dialog } from 'shared/components';

const DeleteBranch = ({ selectedBranch, onDeleteBranch, onClose }) => {
	const [loading, setLoading] = useState(false);

	return (
		<Dialog
			onClose={onClose}
			title={`Delete branch ${selectedBranch}?`}
			confirmButtonText="Delete"
			onConfirm={async () => {
				setLoading(true);
				await onDeleteBranch({ branch: selectedBranch });
				onClose();
			}}
			onCancel={onClose}
			loading={loading}
		>
			Are you sure you want to delete branch?
		</Dialog>
	);
};

export default DeleteBranch;
