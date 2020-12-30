import React, { useState } from 'react';
import styled from 'styled-components';
import { Dialog, Input as BaseInput } from 'shared/components';

const Input = styled(BaseInput)`
  width: 100%;
`;

const Text = styled.div`
  overflow: auto;
  padding: 16px 0;
`;

const InviteUserDialog = ({ onClose, onInviteUser }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  return (
    <Dialog
      onClose={onClose}
      title="Invite user"
      confirmButtonText={success ? 'Close' : 'Invite'}
      onConfirm={async () => {
        if (success) {
          onClose();
          return;
        }
        setIsLoading(true);
        await onInviteUser({ email });
        setIsLoading(false);
        setSuccess(true);
      }}
      showCancel={!success}
      onCancel={onClose}
      isLoading={isLoading}
    >
      {success ? (
        <Text>Invitation was sent to {email}</Text>
      ) : (
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter an email..."
        />
      )}
    </Dialog>
  );
};

export default InviteUserDialog;
