import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';

const ChangeInformationFormDialog = ({ open, onClose, onSave, initialValues }) => {
  const [firstName, setFirstName] = useState(initialValues.firstName || '');
  const [lastName, setLastName] = useState(initialValues.lastName || '');
  const [email, setEmail] = useState(initialValues.email || '');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSaveInformation = () => {
    onSave({ firstName, lastName, email });
    onClose();
    navigate('/');
    dispatch(logout());
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { width: '400px' } }}>
      <DialogTitle>Edit Information</DialogTitle>
      <DialogContent>
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="normal"
          multiline
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          multiline
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSaveInformation} color="primary">
          Save and Log Out
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangeInformationFormDialog;
