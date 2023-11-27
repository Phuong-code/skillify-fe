import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const UserSearchResultComponent = ({ user }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, width: 350 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography variant="h5" gutterBottom>
            <strong>First Name:</strong> {user.firstName}
          </Typography>
          <Typography variant="h5" gutterBottom>
            <strong>Last Name:</strong> {user.lastName}
          </Typography>
          <Typography variant="h5" gutterBottom>
            <strong>Role:</strong> {user.role}
          </Typography>
          <Typography variant="h5" gutterBottom>
            <strong>Email:</strong> {user.email}
          </Typography>
        </div>
      </Paper>
    </Box>
  );
};

export default UserSearchResultComponent;
