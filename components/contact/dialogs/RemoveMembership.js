import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { ErrorMessage } from '../../styles/Messages';
import { useState } from 'react';
import { Cancel, Delete } from '@material-ui/icons';
import { useMutation } from '@apollo/client';
import { REMOVE_CONTACT_GROUP } from '../../../queries/ContactQueries';
import { BaseButton, DeleteButton } from '../../styles/Button';

const RemoveMembership = ({ open, onClose, contactId, group }) => {
  const [isExecuting, setIsExecuting] = useState(false),
    [error, setError] = useState('');

  const [removeMembership] = useMutation(REMOVE_CONTACT_GROUP);

  const handleClose = () => {
    if (isExecuting) {
      return;
    }
    setError('');
    onClose();
  };
  const handleDelete = async () => {
    if (isExecuting) {
      return;
    }
    setIsExecuting(true);
    try {
      await removeMembership({
        variables: {
          contactId,
          groupId: group.groupId,
        },
      });
    } catch (e) {
      if (e.graphQLErrors) {
        // Probably access denied.
        setError(e.graphQLErrors.map((e) => e.message).join('\n'));
      }
      setIsExecuting(false);
      return;
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Remove "{group.name}" membership</DialogTitle>
      <DialogContent>
        <ErrorMessage>
          Are you sure you want to remove this membership?
        </ErrorMessage>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </DialogContent>
      <DialogActions>
        <BaseButton disabled={isExecuting} onClick={handleClose}>
          <Cancel /> Cancel
        </BaseButton>
        <DeleteButton disabled={isExecuting} onClick={handleDelete}>
          <Delete /> Delete
        </DeleteButton>
      </DialogActions>
    </Dialog>
  );
};

RemoveMembership.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  contactId: PropTypes.string.isRequired,
  group: PropTypes.object.isRequired,
};

export default RemoveMembership;
