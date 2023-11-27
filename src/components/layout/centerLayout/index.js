import React from 'react';
import { CssBaseline, Box, Container } from '@mui/material';
import Navbar from '../defaultLayout/Navbar';

const CenterLayout = ({ children }) => (
  <Box
    height="100vh"
    sx={{
      backgroundColor: 'grey.50',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <CssBaseline />
    <Navbar />
    <Container
      maxWidth="lg"
      style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </Container>
  </Box>
);

export default CenterLayout;
