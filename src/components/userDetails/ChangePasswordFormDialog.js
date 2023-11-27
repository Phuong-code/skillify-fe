import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
// import { useDispatch } from 'react-redux';
// import { logout } from '../../actions/authActions';

const ChangePasswordFormDialog = ({ open, onClose, onSave }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //   const navigate = useNavigate();
  //   const dispatch = useDispatch();

  const handleSavePassword = () => {
    if (newPassword === confirmPassword) {
      onSave({ oldPassword, newPassword, confirmPassword });
      onClose();
      //   navigate('/');
      //   dispatch(logout());
    } else {
      console.log('Failing to update password');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { width: '400px' } }}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <TextField
          label="Current Password"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSavePassword} color="primary">
          Save Password and Log Out
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordFormDialog;
