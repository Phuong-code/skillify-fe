import React from 'react';
import { CssBaseline, Box, Container } from '@mui/material';
import Navbar from './Navbar';

const DefaultLayout = ({ children }) => (
  <Box height="100vh" sx={{ backgroundColor: 'grey.50' }}>
    <CssBaseline />
    <Navbar />
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Container>
  </Box>
);

export default DefaultLayout;
