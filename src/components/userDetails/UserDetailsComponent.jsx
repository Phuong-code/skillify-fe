import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Chip } from '@mui/material';
import { useSelector } from 'react-redux';
import ChangeInformationFormDialog from './ChangeInformationFormDialog';
import ChangePasswordFormDialog from './ChangePasswordFormDialog';
import ProfileImage from '../../assets/profile_image.jpg';
import userService from '../../service/userService';

const UserDetailsComponent = () => {
  const currentUser = useSelector((state) => state.auth.userInfo);
  const [isChangeInformationDialogOpen, setChangeInformationDialogOpen] = useState(false);
  const [updatedUserInfo, setUpdatedUserInfo] = useState(currentUser);
  const [isChangePasswordDialogOpen, setChangePasswordDialogOpen] = useState(false);
  const [traineeFullInfo, setTraineeFullInfo] = useState(null);

  useEffect(() => {
    if (updatedUserInfo !== currentUser) {
      setUpdatedUserInfo(currentUser);
    }
  }, [currentUser, updatedUserInfo]);

  useEffect(() => {
    if (updatedUserInfo?.role === 'TRAINEE') {
      const fetchTraineeFullInfo = async () => {
        try {
          const response = await userService.getTraineeFullInfo(updatedUserInfo.email);
          setTraineeFullInfo(response);
        } catch (error) {
          console.error('Error fetching trainee full info:', error);
          alert('Something went wrong');
        }
      };
      fetchTraineeFullInfo();
    }
  }, [updatedUserInfo]);

  const handleSaveInformation = async (newInformation) => {
    try {
      const updatedUser = await userService.updateInformation(newInformation);
      setChangeInformationDialogOpen(false);
      setUpdatedUserInfo(updatedUser);
    } catch (error) {
      console.error('Error updating user information:', error);
      alert('Something went wrong');
    }
  };

  const handleSaveNewPassword = async (newPassword) => {
    try {
      const updatedPassword = await userService.updatePassword(newPassword);
      setChangePasswordDialogOpen(false);
      console.log('updated Password', updatedPassword);
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Something went wrong');
    }
  };

  const handleCloseDialog = () => {
    setChangeInformationDialogOpen(false);
    setChangePasswordDialogOpen(false);
  };

  const handleChangePasswordClick = () => {
    setChangePasswordDialogOpen(true);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <img
            src={ProfileImage}
            alt="User Avatar"
            style={{ width: '200px', height: '200px', borderRadius: '50%' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography variant="h5" gutterBottom style={{ textAlign: 'left' }}>
            <strong>First Name:</strong> {updatedUserInfo?.firstName.toUpperCase()}
          </Typography>
          <Typography variant="h5" gutterBottom style={{ textAlign: 'left' }}>
            <strong>Last Name:</strong> {updatedUserInfo?.lastName.toUpperCase()}
          </Typography>
          <Typography variant="h5" gutterBottom style={{ textAlign: 'left' }}>
            <strong>Role:</strong> {updatedUserInfo?.role.toLowerCase()}
          </Typography>
          <Typography variant="h5" gutterBottom style={{ textAlign: 'left' }}>
            <strong>Email:</strong> {updatedUserInfo?.email}
          </Typography>
          {updatedUserInfo?.role === 'TRAINEE' && (
            <>
              <Typography variant="h5" gutterBottom>
                <strong>Status:</strong> {traineeFullInfo?.type}
              </Typography>
              <Typography variant="h5" gutterBottom style={{ textAlign: 'left' }}>
                <strong>Skills:</strong>{' '}
                {traineeFullInfo?.skillNames.map((skill, index) => (
                  <Chip
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    label={skill}
                    variant="outlined"
                    style={{ fontSize: '16px', marginRight: '8px', marginBottom: '8px' }}
                  />
                ))}
              </Typography>
            </>
          )}
        </div>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, fontSize: '1.2rem', width: '250px', height: '50px' }}
          onClick={() => setChangeInformationDialogOpen(true)}
        >
          Edit Information
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, fontSize: '1.2rem', width: '250px', height: '50px' }}
          onClick={handleChangePasswordClick}
        >
          Change Password
        </Button>
        <ChangeInformationFormDialog
          open={isChangeInformationDialogOpen}
          onClose={handleCloseDialog}
          onSave={handleSaveInformation}
          initialValues={{
            firstName: updatedUserInfo?.firstName,
            lastName: updatedUserInfo?.lastName,
            email: updatedUserInfo?.email,
          }}
        />
        <ChangePasswordFormDialog
          open={isChangePasswordDialogOpen}
          onClose={handleCloseDialog}
          onSave={handleSaveNewPassword}
        />
      </Paper>
    </Box>
  );
};

export default UserDetailsComponent;
