import React from 'react';
import { CssBaseline, Box, Container } from '@mui/material';
import SimpleNavbar from './SimpleNavbar';

const AuthLayout = ({ children }) => (
  <Box
    height="100vh"
    sx={{
      backgroundColor: 'grey.50',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <CssBaseline />
    <SimpleNavbar />
    <Container
      maxWidth="lg"
      style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      {children}
    </Container>
  </Box>
);

export default AuthLayout;
