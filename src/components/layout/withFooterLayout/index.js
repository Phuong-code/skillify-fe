import React from 'react';
import { CssBaseline, Box, Container } from '@mui/material';
import Navbar from '../defaultLayout/Navbar';
import Footer from './Footer';

const WithFooterLayout = ({ children }) => (
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
    <Footer />
  </Box>
);

export default WithFooterLayout;
