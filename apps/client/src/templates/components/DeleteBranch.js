import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { FloatingButton } from 'shared/components';
import BaseDeleteIcon from 'shared/assets/icons/delete.svg';
import DeleteBranchDialog from './DeleteBranchDialog';

const DeleteIcon = styled(BaseDeleteIcon)`
	path {
		fill: ${({ theme }) => theme.colors.white};
	}
`;

const DeleteBranch = ({ selectedBranch, onDeleteBranch }) => {
	const [showModal, setShowModal] = useState(false);
	const handleCloseDialog = useCallback(() => setShowModal(false), []);

	return (
		<>
			{selectedBranch && (
				<FloatingButton onClick={() => setShowModal(true)}>
					<DeleteIcon />
				</FloatingButton>
			)}

			{showModal && (
				<DeleteBranchDialog
					selectedBranch={selectedBranch}
					onDeleteBranch={onDeleteBranch}
					onClose={handleCloseDialog}
				/>
			)}
		</>
	);
};

export default DeleteBranch;
