import React, { useState } from 'react';
import { Box, Typography, List, ListItem, Button, Paper } from '@mui/material';
import UserDetails from './UserDetails';
import WithFooterLayout from '../components/layout/withFooterLayout';

const users = [
  {
    id: 1,
    firstName: 'Zhan Zhao',
    lastName: 'Yang',
    role: 'trainee',
    email: 'ZhanZhao@Skillify.com',
  },
  {
    id: 2,
    firstName: 'Matthew',
    lastName: 'Theseira',
    role: 'trainee',
    email: 'Matthew@Skillify.com',
  },
  {
    id: 3,
    firstName: 'Min',
    lastName: 'Park',
    role: 'trainee',
    email: 'Min@Skillify.com',
  },
  {
    id: 4,
    firstName: 'Yifeng',
    lastName: 'Chen',
    role: 'trainee',
    email: 'Yifeng@Skillify.com',
  },
  {
    id: 5,
    firstName: 'Cao Vinh',
    lastName: 'Lam',
    role: 'trainee',
    email: 'CaoVinh@Skillify.com',
  },
  {
    id: 6,
    firstName: 'Phil',
    lastName: 'Vu',
    role: 'trainee',
    email: 'Phil@Skillify.com',
  },
];

const UserList = () => {
  const [selectedUser, setSelectedUser] = useState(null); // State to keep track of selected user

  const handleUserClick = (user) => {
    setSelectedUser(user); // Update selected user when a user is clicked
  };

  return (
    <WithFooterLayout>
      <Typography variant="h3" gutterBottom sx={{ marginBottom: '40px', marginTop: '40px' }}>
        User List
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            justifyContent: 'flex-end',
            overflow: 'auto',
            border: '1px solid #ccc',
          }}
        >
          <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, marginTop: 1, marginBottom: 1 }}>
            <List>
              {users.map((user) => (
                <ListItem key={user.id} sx={{ textDecoration: 'none', color: 'black' }}>
                  <Button
                    component="div"
                    variant="text"
                    color="primary"
                    onClick={() => handleUserClick(user)}
                    sx={{
                      textTransform: 'none',
                      backgroundColor: 'transparent',
                      width: '100%', // Make the button fill up the width
                      border: '1px solid #ccc',
                      '&:hover': {
                        backgroundColor: '#e0e0e0',
                      },
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="h5" color="black">
                        {user.firstName} {user.lastName}
                      </Typography>
                    </div>
                  </Button>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            flex: 1,
            overflow: 'auto',
            border: '1px solid #ccc',
            paddingLeft: '20px',
          }}
        >
          {selectedUser && <UserDetails user={selectedUser} />}
        </Box>
      </Box>
    </WithFooterLayout>
  );
};

export default UserList;
