import React from 'react';
import { Box } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        backgroundColor: '#007bff',
        color: '#fff',
        textAlign: 'center',
      }}
    >
      © {new Date().getFullYear()} Skillify. All rights reserved.
    </Box>
  );
};

export default Footer;
